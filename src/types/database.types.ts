export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: "super_admin" | "associado"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: "super_admin" | "associado"
          created_at?: string
          updated_at?: string
        }
        Update: {
          role?: "super_admin" | "associado"
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          icon?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      cities: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          name?: string
          slug?: string
        }
        Relationships: []
      }
      associados: {
        Row: {
          id: string
          user_id: string | null
          slug: string
          name: string
          logo_url: string | null
          cover_url: string | null
          description: string | null
          description_html: string | null
          category_id: string | null
          city_id: string | null
          phone: string | null
          whatsapp: string | null
          instagram: string | null
          website: string | null
          external_link: string | null
          status: "pending" | "active" | "inactive"
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          slug: string
          name: string
          logo_url?: string | null
          cover_url?: string | null
          description?: string | null
          description_html?: string | null
          category_id?: string | null
          city_id?: string | null
          phone?: string | null
          whatsapp?: string | null
          instagram?: string | null
          website?: string | null
          external_link?: string | null
          status?: "pending" | "active" | "inactive"
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string | null
          slug?: string
          name?: string
          logo_url?: string | null
          cover_url?: string | null
          description?: string | null
          description_html?: string | null
          category_id?: string | null
          city_id?: string | null
          phone?: string | null
          whatsapp?: string | null
          instagram?: string | null
          website?: string | null
          external_link?: string | null
          status?: "pending" | "active" | "inactive"
          featured?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "associados_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "associados_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      associado_services: {
        Row: {
          id: string
          associado_id: string
          name: string
          sort_order: number
        }
        Insert: {
          id?: string
          associado_id: string
          name: string
          sort_order?: number
        }
        Update: {
          name?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "associado_services_associado_id_fkey"
            columns: ["associado_id"]
            isOneToOne: false
            referencedRelation: "associados"
            referencedColumns: ["id"]
          },
        ]
      }
      associado_photos: {
        Row: {
          id: string
          associado_id: string
          url: string
          caption: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          associado_id: string
          url: string
          caption?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          url?: string
          caption?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "associado_photos_associado_id_fkey"
            columns: ["associado_id"]
            isOneToOne: false
            referencedRelation: "associados"
            referencedColumns: ["id"]
          },
        ]
      }
      noticias: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content_html: string
          cover_url: string | null
          published: boolean
          featured: boolean
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content_html: string
          cover_url?: string | null
          published?: boolean
          featured?: boolean
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          slug?: string
          title?: string
          excerpt?: string | null
          content_html?: string
          cover_url?: string | null
          published?: boolean
          featured?: boolean
          author_id?: string | null
          published_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      eventos: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content_html: string | null
          cover_url: string | null
          location: string | null
          city_id: string | null
          start_date: string
          end_date: string | null
          published: boolean
          featured: boolean
          author_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content_html?: string | null
          cover_url?: string | null
          location?: string | null
          city_id?: string | null
          start_date: string
          end_date?: string | null
          published?: boolean
          featured?: boolean
          author_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          slug?: string
          title?: string
          excerpt?: string | null
          content_html?: string | null
          cover_url?: string | null
          location?: string | null
          city_id?: string | null
          start_date?: string
          end_date?: string | null
          published?: boolean
          featured?: boolean
          author_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "eventos_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          id: string
          title: string | null
          subtitle: string | null
          cta_text: string | null
          cta_url: string | null
          image_url: string
          active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          subtitle?: string | null
          cta_text?: string | null
          cta_url?: string | null
          image_url: string
          active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          title?: string | null
          subtitle?: string | null
          cta_text?: string | null
          cta_url?: string | null
          image_url?: string
          active?: boolean
          sort_order?: number
        }
        Relationships: []
      }
      site_content: {
        Row: {
          key: string
          value_text: string | null
          value_html: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          key: string
          value_text?: string | null
          value_html?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          value_text?: string | null
          value_html?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: string | null
        }
        Insert: {
          key: string
          value?: string | null
        }
        Update: {
          value?: string | null
        }
        Relationships: []
      }
      seja_associado_leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          category_id: string | null
          city_id: string | null
          message: string | null
          status: "new" | "contacted" | "converted" | "rejected"
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          category_id?: string | null
          city_id?: string | null
          message?: string | null
          status?: "new" | "contacted" | "converted" | "rejected"
          created_at?: string
        }
        Update: {
          status?: "new" | "contacted" | "converted" | "rejected"
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          read?: boolean
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_super_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
