export class HomeRowDto {
   home_row_id?: string
   home_row_uuid?: string
   home_row_name?: string
   home_row_type?: string
   home_row_tags?: string
   home_row_sequence?: number
   home_row_created_date?: string
   home_row_updated_date?: string

   constructor(home_row_uuid:string, home_row_name:string, home_row_type:string, home_row_tags:string) {
      this.home_row_uuid = home_row_uuid
      this.home_row_name = home_row_name
      this.home_row_type = home_row_type
      this.home_row_tags = home_row_tags
   }

   static fromObject(obj: any) {
      return new HomeRowDto(obj.home_row_uuid, obj.home_row_name, obj.home_row_type, obj.home_row_tags);
   }
}