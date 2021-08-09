export class MoviesDTO {
   movie_id?: string
   movie_uuid?: string
   movie_title?: string
   movie_synopsis?: string
   movie_type_uuid?: string
   movie_type_name?: string
   movie_classification_uuid?: string
   movie_classification_name?: string
   movie_trailer_url?: string
   movie_duration?: number
   movie_price?: number
   movie_is_subscription_availability?: string
   movie_thumbnail_vertical_url?: string
   movie_thumbnail_horizontal_url?: string
   movie_year?: string

   movie_is_bought?: boolean = false

   constructor(movie_uuid: string, movie_title: string, movie_synopsis: string, movie_type_uuid: string, movie_type_name: string, movie_classification_uuid: string, movie_classification_name: string, movie_trailer_url: string, movie_duration: number, movie_price: number, movie_is_subscription_availability: string, movie_thumbnail_vertical_url: string, movie_thumbnail_horizontal_url: string, movie_year: string, movie_is_bought: boolean) {
      this.movie_uuid = movie_uuid
      this.movie_title = movie_title
      this.movie_synopsis = movie_synopsis
      this.movie_type_uuid = movie_type_uuid
      this.movie_type_name = movie_type_name
      this.movie_classification_uuid = movie_classification_uuid
      this.movie_classification_name = movie_classification_name
      this.movie_trailer_url = movie_trailer_url
      this.movie_duration = movie_duration
      this.movie_price = movie_price
      this.movie_is_subscription_availability = movie_is_subscription_availability
      this.movie_thumbnail_vertical_url = movie_thumbnail_vertical_url
      this.movie_thumbnail_horizontal_url = movie_thumbnail_horizontal_url
      this.movie_year = movie_year
      this.movie_is_bought = movie_is_bought
   }

   static fromObject(obj: any) {
      return new MoviesDTO(obj.movie_uuid, obj.movie_title, obj.movie_synopsis, obj.movie_type_uuid, obj.movie_type_name, obj.movie_classification_uuid, obj.movie_classification_name, obj.movie_trailer_url, obj.movie_duration, obj.movie_price, obj.movie_is_subscription_availability, obj.movie_thumbnail_vertical_url, obj.movie_thumbnail_horizontal_url, obj.movie_year, obj.movie_is_bought);
   }
}