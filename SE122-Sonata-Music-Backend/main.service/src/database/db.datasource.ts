import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { Admin } from '@/models/admin.model';
import { Album } from '@/models/album.model';
import { Artist } from '@/models/artist.model';
import { ArtistStudent } from '@/models/artist_student.model';
import { Category } from '@/models/category.model';
import { Contributor } from '@/models/contributor.model';
import { FavoriteList } from '@/models/favorite_list.model';
import { Genre } from '@/models/genre.model';
import { Instrument } from '@/models/instrument.model';
import { Listener } from '@/models/listener.model';
import { Music } from '@/models/music.model';
import { Orchestra } from '@/models/orchestra.model';
import { Period } from '@/models/period.model';
import { QuizFeedback } from '@/models/quiz_feedback.model';
import { Quiz } from '@/models/quiz.model';
import { BaseModel } from '@/models/base/base.model';
import { TimelessPieces } from '@/models/timeless_pieces.model';
import { AlbumSubscriber } from '@/models/subcribers/album.subcriber';
import { ArtistSubscriber } from '@/models/subcribers/artist.subcriber';
import { ListenerAlbumLike } from '@/models/listener_album_like.model';
import { ArtistFollower } from '@/models/artist_follower.model';
import { CategorySubscriber } from '@/models/subcribers/category.subcriber';
import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { ListenerMusicRecommendScore } from '@/models/listener_music_recommend_score.model';
import { MusicSubscriber } from '@/models/subcribers/music.subcriber';

const MODELS = [
  Admin,
  Album,
  Artist,
  ArtistStudent,
  Category,
  Contributor,
  FavoriteList,
  Genre,
  Instrument,
  Listener,
  Music,
  Orchestra,
  Period,
  QuizFeedback,
  Quiz,
  TimelessPieces,
  BaseModel,
  ListenerAlbumLike,
  ArtistFollower,
  ListenerAnswerQuiz,
  ListenerMusicRecommendScore
];

export class AppDataSourceSingleton {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!AppDataSourceSingleton.instance) {
      AppDataSourceSingleton.instance = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'test',
        entities: MODELS,
        synchronize: GlobalConfig.database.sync,
        logging: true,
        migrations: [__dirname + '/migrations/*.js'],
        subscribers: [AlbumSubscriber, ArtistSubscriber, CategorySubscriber, MusicSubscriber]
      });
    }
    return AppDataSourceSingleton.instance;
  }
}

export const AppDataSource = AppDataSourceSingleton.getInstance();
