import { BaseModel } from '@/models/base/base.model';
import { Music } from '@/models/music.model';
import { Column, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Index('timeless_pieces_unique', ['musicId'], { unique: true })
@Entity('timeless_pieces')
export class TimelessPieces extends BaseModel {
  @Column('bigint', { name: 'music_id' })
  musicId!: number;

  @Column('bigint', { name: 'vote_count' })
  voteCount!: number;

  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Music)
  @JoinColumn({ name: 'music_id' })
  music!: Music;
}
