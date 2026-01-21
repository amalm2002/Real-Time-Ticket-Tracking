import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ unique: true, type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.USER,
  })
  user_type!: UserType;

  // 🔥 SINGLE token field
  @Column({ type: "varchar", length: 100, nullable: true })
  token!: string | null;

  @CreateDateColumn()
  joining_date!: Date;
}
