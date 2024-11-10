import { Migration } from '@mikro-orm/migrations';

export class Migration20241110084902 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "media" ("id" text not null, "name" text not null, "url" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "media_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "media" cascade;');
  }

}
