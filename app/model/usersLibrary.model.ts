export class UsersLibraryDto {
   user_library_id?: string
   user_library_movie_id?: string
   user_library_movie_uuid?: string
   user_library_user_id?: string
   user_library_user_uuid?: string
   user_library_movie_price?: number

   user_library_created_date?: string
   user_library_updated_date?: string

   constructor(user_library_user_uuid: string, user_library_movie_uuid: string, user_library_movie_price:number) {
      this.user_library_user_uuid = user_library_user_uuid
      this.user_library_movie_uuid = user_library_movie_uuid
      this.user_library_movie_price = user_library_movie_price
   }

   static fromObject(obj: any) {
      return new UsersLibraryDto(obj.user_library_user_uuid, obj.user_library_movie_uuid, obj.user_library_movie_price);
   }
}