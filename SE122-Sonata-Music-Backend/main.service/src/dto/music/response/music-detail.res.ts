import { QuizInMusicRes } from '@/dto/quiz/response/quiz-in-music.res';
import { Album } from '@/models/album.model';
import { Artist } from '@/models/artist.model';
import { Category } from '@/models/category.model';
import { Genre } from '@/models/genre.model';
import { Instrument } from '@/models/instrument.model';
import { Period } from '@/models/period.model';

export class MusicDetailRes {
  id!: number;

  name!: string;

  description!: string;

  approved!: boolean;

  approvedBy!: {
    id: number;
    name: string;
  };

  lyric!: string;

  coverPhoto!: string;

  resourceLink!: string;

  uploadedBy!: {
    id: number;
    fullname: string;
  };

  albums!: Album[];

  quizzes!: QuizInMusicRes[];

  genres!: Genre[];

  instruments!: Instrument[];

  periods!: Period[];

  categories!: Category[];

  artists!: Artist[];

  composers!: Artist[];

  createAt!: Date;

  updateAt!: Date;
}
