export class UsersDto {
   user_id?: string
   user_uuid?: string
   user_first_name?: string
   user_last_name?: string
   user_email?: string
   user_password?: string
   user_token?: string
   user_birthday?: string
   user_gender?: string
   user_created_date?: string
   user_updated_date?: string

   constructor(user_uuid: string, user_first_name: string, user_last_name: string, user_email: string, user_birthday: string, user_gender: string) {
      this.user_uuid = user_uuid
      this.user_first_name = user_first_name
      this.user_last_name = user_last_name
      this.user_email = user_email
      this.user_birthday = user_birthday
      this.user_gender = user_gender
   }

   static fromObject(obj: any) {
      return new UsersDto(obj.user_uuid, obj.user_first_name, obj.user_last_name, obj.user_email, obj.user_birthday, obj.user_gender);
   }
}