export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      master_applications: {
        Row: {
          age: number | null
          categories: string[]
          created_at: string | null
          documents: string[] | null
          experience: string | null
          full_name: string
          id: string
          phone: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          user_id: string
        }
        Insert: {
          age?: number | null
          categories: string[]
          created_at?: string | null
          documents?: string[] | null
          experience?: string | null
          full_name: string
          id?: string
          phone: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id: string
        }
        Update: {
          age?: number | null
          categories?: string[]
          created_at?: string | null
          documents?: string[] | null
          experience?: string | null
          full_name?: string
          id?: string
          phone?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      masters: {
        Row: {
          categories: string[]
          created_at: string | null
          district: string
          documents: string[] | null
          experience: string | null
          full_name: string
          id: string
          phone: string
          status: string
          user_id: string | null
        }
        Insert: {
          categories: string[]
          created_at?: string | null
          district: string
          documents?: string[] | null
          experience?: string | null
          full_name: string
          id?: string
          phone: string
          status?: string
          user_id?: string | null
        }
        Update: {
          categories?: string[]
          created_at?: string | null
          district?: string
          documents?: string[] | null
          experience?: string | null
          full_name?: string
          id?: string
          phone?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: string
          assigned_master_id: string | null
          budget: string
          category_id: string
          comment: string | null
          completed_at: string | null
          created_at: string | null
          district: string
          id: string
          object_type: string
          order_number: string
          photos: string[] | null
          preferred_time: string
          rating: number | null
          review: string | null
          status: string
          total_price: number | null
          user_id: string
        }
        Insert: {
          address: string
          assigned_master_id?: string | null
          budget: string
          category_id: string
          comment?: string | null
          completed_at?: string | null
          created_at?: string | null
          district: string
          id?: string
          object_type: string
          order_number: string
          photos?: string[] | null
          preferred_time: string
          rating?: number | null
          review?: string | null
          status?: string
          total_price?: number | null
          user_id: string
        }
        Update: {
          address?: string
          assigned_master_id?: string | null
          budget?: string
          category_id?: string
          comment?: string | null
          completed_at?: string | null
          created_at?: string | null
          district?: string
          id?: string
          object_type?: string
          order_number?: string
          photos?: string[] | null
          preferred_time?: string
          rating?: number | null
          review?: string | null
          status?: string
          total_price?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_assigned_master"
            columns: ["assigned_master_id"]
            isOneToOne: false
            referencedRelation: "masters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_superadmin: boolean | null
          phone: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_superadmin?: boolean | null
          phone?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_superadmin?: boolean | null
          phone?: string | null
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string | null
          icon: string
          id: string
          key: string
          name_en: string
          name_ru: string
          name_tj: string
          sort_order: number
        }
        Insert: {
          created_at?: string | null
          icon: string
          id?: string
          key: string
          name_en: string
          name_ru: string
          name_tj: string
          sort_order?: number
        }
        Update: {
          created_at?: string | null
          icon?: string
          id?: string
          key?: string
          name_en?: string
          name_ru?: string
          name_tj?: string
          sort_order?: number
        }
        Relationships: []
      }
      services: {
        Row: {
          avg_price: string
          category_id: string
          created_at: string | null
          id: string
          max_price: string
          min_price: string
          note_en: string | null
          note_ru: string | null
          note_tj: string | null
          service_name_en: string
          service_name_ru: string
          service_name_tj: string
          subcategory_en: string | null
          subcategory_icon: string | null
          subcategory_ru: string | null
          subcategory_tj: string | null
          unit_en: string
          unit_ru: string
          unit_tj: string
          updated_at: string | null
        }
        Insert: {
          avg_price: string
          category_id: string
          created_at?: string | null
          id?: string
          max_price: string
          min_price: string
          note_en?: string | null
          note_ru?: string | null
          note_tj?: string | null
          service_name_en: string
          service_name_ru: string
          service_name_tj: string
          subcategory_en?: string | null
          subcategory_icon?: string | null
          subcategory_ru?: string | null
          subcategory_tj?: string | null
          unit_en: string
          unit_ru: string
          unit_tj: string
          updated_at?: string | null
        }
        Update: {
          avg_price?: string
          category_id?: string
          created_at?: string | null
          id?: string
          max_price?: string
          min_price?: string
          note_en?: string | null
          note_ru?: string | null
          note_tj?: string | null
          service_name_en?: string
          service_name_ru?: string
          service_name_tj?: string
          subcategory_en?: string | null
          subcategory_icon?: string | null
          subcategory_ru?: string | null
          subcategory_tj?: string | null
          unit_en?: string
          unit_ru?: string
          unit_tj?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
