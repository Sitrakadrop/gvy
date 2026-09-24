export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };

  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string | null;
          description: string | null;
          color: string | null;
          accent: string | null;
          slug: string | null;
          sort_order: number | null;
          created_at: string;
        };

        Insert: {
          id?: string;
          name: string;
          icon?: string | null;
          description?: string | null;
          color?: string | null;
          accent?: string | null;
          slug?: string | null;
          sort_order?: number | null;
          created_at?: string;
        };

        Update: {
          id?: string;
          name?: string;
          icon?: string | null;
          description?: string | null;
          color?: string | null;
          accent?: string | null;
          slug?: string | null;
          sort_order?: number | null;
          created_at?: string;
        };

        Relationships: [];
      };

      templates: {
        Row: {
          template_id: string;
          name: string;
          category_id: string;
          drive_pdf_id: string | null;
          drive_pptx_id: string | null;
          preview_file_id: string | null;
          is_active: boolean;
          created_at: string | null;
          updated_at: string | null;

          /*
           * Champs conservés pour compatibilité
           * avec certaines anciennes parties
           * du frontend.
           */
          description: string | null;
          slides: number | null;
        };

        Insert: {
          template_id: string;
          name: string;
          category_id: string;
          drive_pdf_id?: string | null;
          drive_pptx_id?: string | null;
          preview_file_id?: string | null;
          is_active?: boolean;
          created_at?: string | null;
          updated_at?: string | null;
          description?: string | null;
          slides?: number | null;
        };

        Update: {
          template_id?: string;
          name?: string;
          category_id?: string;
          drive_pdf_id?: string | null;
          drive_pptx_id?: string | null;
          preview_file_id?: string | null;
          is_active?: boolean;
          created_at?: string | null;
          updated_at?: string | null;
          description?: string | null;
          slides?: number | null;
        };

        Relationships: [
          {
            foreignKeyName: "templates_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };

      favorites: {
        Row: {
          id: string;
          template_id: string;
          whop_user_id: string;
          created_at: string;
        };

        Insert: {
          id?: string;
          template_id: string;
          whop_user_id: string;
          created_at?: string;
        };

        Update: {
          id?: string;
          template_id?: string;
          whop_user_id?: string;
          created_at?: string;
        };

        Relationships: [
          {
            foreignKeyName: "favorites_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "templates";
            referencedColumns: ["template_id"];
          },
        ];
      };

      downloads: {
        Row: {
          id: string;
          template_id: string;
          member_id: string;
          file_type: string;
          downloaded_at: string;
        };

        Insert: {
          id?: string;
          template_id: string;
          member_id: string;
          file_type: string;
          downloaded_at?: string;
        };

        Update: {
          id?: string;
          template_id?: string;
          member_id?: string;
          file_type?: string;
          downloaded_at?: string;
        };

        Relationships: [
          {
            foreignKeyName: "downloads_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "templates";
            referencedColumns: ["template_id"];
          },
        ];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<
  Database,
  "__InternalSupabase"
>;

type DefaultSchema =
  DatabaseWithoutInternals[
    Extract<keyof Database, "public">
  ];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (
        DefaultSchema["Tables"] &
        DefaultSchema["Views"]
      )
    | {
        schema: keyof DatabaseWithoutInternals;
      },
  TableName extends (
    DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof (
          DatabaseWithoutInternals[
            DefaultSchemaTableNameOrOptions["schema"]
          ]["Tables"] &
          DatabaseWithoutInternals[
            DefaultSchemaTableNameOrOptions["schema"]
          ]["Views"]
        )
      : never
  ) = never,
> =
  DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? (
        DatabaseWithoutInternals[
          DefaultSchemaTableNameOrOptions["schema"]
        ]["Tables"] &
        DatabaseWithoutInternals[
          DefaultSchemaTableNameOrOptions["schema"]
        ]["Views"]
      )[TableName] extends {
        Row: infer R;
      }
      ? R
      : never
    : DefaultSchemaTableNameOrOptions extends keyof (
        DefaultSchema["Tables"] &
        DefaultSchema["Views"]
      )
      ? (
          DefaultSchema["Tables"] &
          DefaultSchema["Views"]
        )[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R;
        }
        ? R
        : never
      : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | {
        schema: keyof DatabaseWithoutInternals;
      },
  TableName extends (
    DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          DefaultSchemaTableNameOrOptions["schema"]
        ]["Tables"]
      : never
  ) = never,
> =
  DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? DatabaseWithoutInternals[
        DefaultSchemaTableNameOrOptions["schema"]
      ]["Tables"][TableName] extends {
        Insert: infer I;
      }
      ? I
      : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][
          DefaultSchemaTableNameOrOptions
        ] extends {
          Insert: infer I;
        }
        ? I
        : never
      : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | {
        schema: keyof DatabaseWithoutInternals;
      },
  TableName extends (
    DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          DefaultSchemaTableNameOrOptions["schema"]
        ]["Tables"]
      : never
  ) = never,
> =
  DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? DatabaseWithoutInternals[
        DefaultSchemaTableNameOrOptions["schema"]
      ]["Tables"][TableName] extends {
        Update: infer U;
      }
      ? U
      : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
      ? DefaultSchema["Tables"][
          DefaultSchemaTableNameOrOptions
        ] extends {
          Update: infer U;
        }
        ? U
        : never
      : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | {
        schema: keyof DatabaseWithoutInternals;
      },
  EnumName extends (
    DefaultSchemaEnumNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          DefaultSchemaEnumNameOrOptions["schema"]
        ]["Enums"]
      : never
  ) = never,
> =
  DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? DatabaseWithoutInternals[
        DefaultSchemaEnumNameOrOptions["schema"]
      ]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
      ? DefaultSchema["Enums"][
          DefaultSchemaEnumNameOrOptions
        ]
      : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | {
        schema: keyof DatabaseWithoutInternals;
      },
  CompositeTypeName extends (
    PublicCompositeTypeNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
    }
      ? keyof DatabaseWithoutInternals[
          PublicCompositeTypeNameOrOptions["schema"]
        ]["CompositeTypes"]
      : never
  ) = never,
> =
  PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? DatabaseWithoutInternals[
        PublicCompositeTypeNameOrOptions["schema"]
      ]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DatabaseWithoutInternals["public"]["CompositeTypes"][
          PublicCompositeTypeNameOrOptions
        ]
      : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;