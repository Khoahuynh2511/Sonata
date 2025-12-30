import { BaseModel } from '@/models/base/base.model';
import { Music } from '@/models/music.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'contributors' })
export class Contributor extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: number;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ name: 'username', type: 'varchar', length: 70 })
  username!: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password!: string;

  @Column({ name: 'fullname', type: 'varchar', length: 50 })
  fullname!: string;

  @Column({ name: 'points', type: 'int', default: 0 })
  points!: number;

  @OneToMany(() => Music, (music) => music.uploadedBy)
  musics!: Music[];
}
