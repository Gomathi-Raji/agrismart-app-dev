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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      diagnose_history: {
        Row: {
          created_at: string | null
          crop_name: string
          diagnosis_id: string
          disease_detected: string | null
          fertilizers_suggested: string | null
          image_url: string | null
          recommendations: string | null
          severity: Database["public"]["Enums"]["severity_level"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          crop_name: string
          diagnosis_id?: string
          disease_detected?: string | null
          fertilizers_suggested?: string | null
          image_url?: string | null
          recommendations?: string | null
          severity?: Database["public"]["Enums"]["severity_level"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          crop_name?: string
          diagnosis_id?: string
          disease_detected?: string | null
          fertilizers_suggested?: string | null
          image_url?: string | null
          recommendations?: string | null
          severity?: Database["public"]["Enums"]["severity_level"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnose_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      fertilizers: {
        Row: {
          created_at: string | null
          description: string | null
          disease_related: string | null
          fertilizer_id: string
          image_url: string | null
          link: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          disease_related?: string | null
          fertilizer_id?: string
          image_url?: string | null
          link?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          disease_related?: string | null
          fertilizer_id?: string
          image_url?: string | null
          link?: string | null
          name?: string
        }
        Relationships: []
      }
      market_prices: {
        Row: {
          crop_name: string
          date_recorded: string | null
          market_id: string
          price_per_kg: number
          region: string
        }
        Insert: {
          crop_name: string
          date_recorded?: string | null
          market_id?: string
          price_per_kg: number
          region: string
        }
        Update: {
          crop_name?: string
          date_recorded?: string | null
          market_id?: string
          price_per_kg?: number
          region?: string
        }
        Relationships: []
      }
      news_blogs: {
        Row: {
          blog_id: string
          content: string
          created_at: string | null
          image_url: string | null
          title: string
        }
        Insert: {
          blog_id?: string
          content: string
          created_at?: string | null
          image_url?: string | null
          title: string
        }
        Update: {
          blog_id?: string
          content?: string
          created_at?: string | null
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          message: string
          notif_id: string
          status: Database["public"]["Enums"]["notification_status"] | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          message: string
          notif_id?: string
          status?: Database["public"]["Enums"]["notification_status"] | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          message?: string
          notif_id?: string
          status?: Database["public"]["Enums"]["notification_status"] | null
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          order_id: string
          product_id: string | null
          quantity: number
          seller_id: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_price: number
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          order_id?: string
          product_id?: string | null
          quantity: number
          seller_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_price: number
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          order_id?: string
          product_id?: string | null
          quantity?: number
          seller_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "orders_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      products: {
        Row: {
          category: Database["public"]["Enums"]["product_category"]
          created_at: string | null
          description: string | null
          image_url: string | null
          location: string | null
          name: string
          price: number
          product_id: string
          quantity: number
          seller_id: string | null
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["product_category"]
          created_at?: string | null
          description?: string | null
          image_url?: string | null
          location?: string | null
          name: string
          price: number
          product_id?: string
          quantity?: number
          seller_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string | null
          description?: string | null
          image_url?: string | null
          location?: string | null
          name?: string
          price?: number
          product_id?: string
          quantity?: number
          seller_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          language_pref: string | null
          location: string | null
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          language_pref?: string | null
          location?: string | null
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language_pref?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      recycle_listings: {
        Row: {
          created_at: string | null
          farmer_id: string | null
          image_url: string | null
          location: string
          price: number | null
          quantity: number
          recycle_id: string
          status: Database["public"]["Enums"]["recycle_status"] | null
          updated_at: string | null
          waste_type: string
        }
        Insert: {
          created_at?: string | null
          farmer_id?: string | null
          image_url?: string | null
          location: string
          price?: number | null
          quantity: number
          recycle_id?: string
          status?: Database["public"]["Enums"]["recycle_status"] | null
          updated_at?: string | null
          waste_type: string
        }
        Update: {
          created_at?: string | null
          farmer_id?: string | null
          image_url?: string | null
          location?: string
          price?: number | null
          quantity?: number
          recycle_id?: string
          status?: Database["public"]["Enums"]["recycle_status"] | null
          updated_at?: string | null
          waste_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "recycle_listings_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          language_pref: string | null
          location: string | null
          name: string
          password_hash: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          language_pref?: string | null
          location?: string | null
          name: string
          password_hash: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          language_pref?: string | null
          location?: string | null
          name?: string
          password_hash?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          created_at: string | null
          forecast_date: string
          rainfall: number | null
          region: string
          suggestion: string | null
          temperature: number | null
          weather_id: string
        }
        Insert: {
          created_at?: string | null
          forecast_date: string
          rainfall?: number | null
          region: string
          suggestion?: string | null
          temperature?: number | null
          weather_id?: string
        }
        Update: {
          created_at?: string | null
          forecast_date?: string
          rainfall?: number | null
          region?: string
          suggestion?: string | null
          temperature?: number | null
          weather_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_status: "unread" | "read"
      notification_type: "weather" | "market" | "disease" | "govt"
      order_status: "pending" | "confirmed" | "shipped" | "delivered"
      product_category: "crop" | "fertilizer" | "seed" | "tool" | "biowaste"
      recycle_status: "available" | "sold" | "reserved"
      severity_level: "mild" | "moderate" | "severe"
      user_role: "farmer" | "buyer" | "seller" | "admin"
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
      notification_status: ["unread", "read"],
      notification_type: ["weather", "market", "disease", "govt"],
      order_status: ["pending", "confirmed", "shipped", "delivered"],
      product_category: ["crop", "fertilizer", "seed", "tool", "biowaste"],
      recycle_status: ["available", "sold", "reserved"],
      severity_level: ["mild", "moderate", "severe"],
      user_role: ["farmer", "buyer", "seller", "admin"],
    },
  },
} as const
