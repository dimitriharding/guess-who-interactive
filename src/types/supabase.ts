export interface Users {
  id: string /* primary key */
  created_at?: string
  updated_at?: string
}

export interface Decks {
  created_at?: string
  updated_at?: string
  owner?: string /* foreign key to users.id */
  description?: string // type unknown;
  public?: boolean
  name?: string
}

export interface Guess_options {
  created_at?: string
  updated_at?: string
  deck_id?: number /* foreign key to decks.id */
  original_image?: string
  masked_image?: string
  options?: any
  decks?: Decks
}

export interface Images {
  id: number /* primary key */
  created_at?: string
  updated_at?: string
  url?: string
  guess_option_id?: number /* foreign key to guess_options.id */
  guess_options?: Guess_options
}
