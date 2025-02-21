import { Auth } from 'src/auth/entities/auth.entity';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Task } from 'src/task/entities/task.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Auth)
  @JoinColumn()
  auth: Auth;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];
}
