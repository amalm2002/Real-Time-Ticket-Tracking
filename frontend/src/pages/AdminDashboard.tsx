import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Ticket, LogOut, Shield, Send, Pencil } from 'lucide-react';
import { useEffect } from 'react';
import { User, UserType } from '@/types';
import { logout } from '@/services/slice/userSlice';
import { useDispatch } from 'react-redux';
import { backendApi } from '@/api/endponit';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await backendApi.getAllUsers();

        const normalizedUsers = data.map((u: any) => ({
          ...u,
          assignedToken: u.token, 
        }));

        setUsers(normalizedUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);



  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const openAssignDialog = (targetUser: User, update: boolean = false) => {
    setSelectedUser(targetUser);
    setTokenInput(update && targetUser.assignedToken ? targetUser.assignedToken : '');
    setIsUpdate(update);
    setDialogOpen(true);
  };

  const handleAssignToken = async () => {
    if (!selectedUser) return;

    try {
      const { token } = await backendApi.assignToken(selectedUser.id);

      setUsers(users.map(u =>
        u.id === selectedUser.id
          ? { ...u, assignedToken: token }
          : u
      ));

      setDialogOpen(false);
      setSelectedUser(null);
      setTokenInput('');
    } catch (error) {
      console.error("Failed to assign token", error);
    }
  }



  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Token System</span>
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage user tokens from here</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">{users.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tokens Assigned</CardDescription>
              <CardTitle className="text-3xl">
                {users.filter(u => u.assignedToken).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Assignment</CardDescription>
              <CardTitle className="text-3xl">
                {users.filter(u => !u.assignedToken).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Select a user to assign or update their token
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Current Token</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((targetUser) => (
                  <TableRow key={targetUser.id}>
                    <TableCell className="font-medium">{targetUser.name}</TableCell>
                    <TableCell>{targetUser.email}</TableCell>
                    <TableCell>
                      {targetUser.assignedToken ? (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-mono">
                          {targetUser.assignedToken}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {targetUser.assignedToken ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openAssignDialog(targetUser, true)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => openAssignDialog(targetUser, false)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Assign Token
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Assign/Update Token Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? 'Update Token' : 'Assign Token'}
            </DialogTitle>
            <DialogDescription>
              {isUpdate
                ? `Update the token for ${selectedUser?.name}`
                : `Assign a new token to ${selectedUser?.name}`
              }
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignToken}>
              {isUpdate ? 'Update' : 'Assign'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminDashboard;
