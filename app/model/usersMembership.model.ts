export class UsersMembershipDto {
   user_membership_id?: string
   user_membership_user_id?: string
   user_membership_user_uuid?: string
   user_membership_start_date?: string
   user_membership_end_date?: string
   user_membership_created_date?: string
   user_membership_updated_date?: string

   constructor(user_membership_user_uuid: string, user_membership_start_date: string, user_membership_end_date: string) {
      this.user_membership_user_uuid = user_membership_user_uuid
      this.user_membership_start_date = user_membership_start_date
      this.user_membership_end_date = user_membership_end_date
   }

   static fromObject(obj: any) {
      return new UsersMembershipDto(obj.user_membership_user_uuid, obj.user_membership_start_date, obj.user_membership_end_date);
   }
}