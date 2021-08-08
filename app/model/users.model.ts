export class UsersDto {
   user_id?: string
   user_uuid?: string
   user_first_name?: string
   user_last_name?: string
   user_email?: string
   user_password?: string
   user_token?: string
   user_created_date?: string
   user_updated_date?: string
   
   constructor(user_uuid: string, user_first_name: string, user_last_name: string, user_email: string) {
      this.user_uuid = user_uuid
      this.user_first_name = user_first_name
      this.user_last_name = user_last_name
      this.user_email = user_email
   }

   static fromObject(obj: any) {
      return new UsersDto(obj.user_uuid, obj.user_first_name, obj.user_last_name, obj.user_email);
   }
}