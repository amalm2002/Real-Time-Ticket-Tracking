import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entities";

export enum TokenStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  token!: string;

  @Column({ type: "uuid" })
  assignedUserId!: string;

  @ManyToOne(() => User, (user) => user.tokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "assignedUserId" })
  user!: User;

  @Column({
    type: "enum",
    enum: TokenStatus,
    default: TokenStatus.ACTIVE,
  })
  status!: TokenStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
