# frozen_string_literal: true

module Api
  module V1
    class TalentsController < ApplicationController
      before_action :set_talent, only: %i[show update destroy]

      # GET /talents
      def index
        # @talents = Talent.includes(:user).page(params[:page]).per(5)
        # total_count = Talent.count

        @talents = Talent.order(created_at: :desc)

        # Apply filters if provided
        @talents = apply_filters(@talents, params[:filter])

        # Apply pagination
        @talents = @talents.page(params[:page]).per(8)

        render json: {
          talents: ActiveModelSerializers::SerializableResource.new(@talents, each_serializer: TalentSerializer),
          total_count: @talents.total_count,
          current_page: @talents.current_page,
          per_page: @talents.limit_value,
          total_pages: @talents.total_pages
        }
        # @talents = Talent.all

        # render json: @talents
      end

      # GET /talents/1
      def show
        render json: @talent
      end

      # POST /talents
      def create
        @talent = Talent.create!(talent_params)

        if @talent.save
          render json: @talent, status: :created
        else
          render json: @talent.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /talents/1
      def update
        if @talent.update(talent_params)
          render json: @talent
        else
          render json: @talent.errors, status: :unprocessable_entity
        end
      end

      # DELETE /talents/1
      def destroy
        @talent.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_talent
        @talent = Talent.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def talent_params
        params.require(:talent).permit(:id, :ads_url, :title, :rate, :category, :user_id)
      end

      def apply_filters(talents, filter)
        talents = talents.where('category LIKE ?', "%#{filter}%") if filter != 'All'
        talents
      end
    end
  end
end
