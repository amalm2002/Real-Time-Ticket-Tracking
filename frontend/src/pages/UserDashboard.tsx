import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, LogOut, User } from 'lucide-react';
import { logout, updateToken } from '@/services/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { connectSocket } from '@/sockets/socketService';
import { socket } from '@/sockets/socket';
import { RootState } from '@/services/store';
import { backendApi } from '@/api/endponit';

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, token } = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (!userId) return;

    backendApi.getUserById(userId).then((user) => {
      if (user.token) {
        dispatch(updateToken(user.token));
      }
    });
  }, [userId]);
  useEffect(() => {
    if (!userId) return;

    connectSocket(userId);

    socket.on("token_assigned", (data) => {
      dispatch(updateToken(data.token));
    });

    return () => {
      socket.off("token_assigned");
    };
  }, [userId, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Token System</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            View your assigned token below
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Your Assigned Token
              </CardTitle>
              <CardDescription>
                This token is assigned specifically to you and updates in real-time
              </CardDescription>
            </CardHeader>

            <CardContent>
              {token ? (
                <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Current Token
                  </p>
                  <p className="text-4xl font-bold text-primary tracking-wider">
                    {token}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-muted-foreground">
                    No token assigned yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your token will appear here once an admin assigns one to you
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
