# frozen_string_literal: true

module Api
  module V1
    class SectionsController < ApplicationController
      before_action :set_section, only: %i[show destroy]

      # GET /sections
      def index
        @sections = Section.all

        render json: @sections
      end

      # GET /sections/1
      def show
        render json: @section
      end

      # POST /sections
      def create
        begin
          Section.transaction do
            @section = Section.create!(section_params)
          end
        rescue ActiveRecord::RecordInvalid => e
          # omitting the exception type rescues all StandardErrors
          @section = {
            error: {
              status: 422,
              message: e
            }
          }
        end
        render json: @section
      end

      # PATCH/PUT /sections
      def batch_update
        begin
          Section.transaction do
            section_params.each do |section_param|
              section = Section.find_or_create_by(id: section_param[:id])
              section.update!(section_param.except(:id))
            end
          end
          @sections = Section.where(id: section_params.map { |param| param[:id] })
        rescue ActiveRecord::RecordNotFound => e
          @sections = {
            error: {
              status: 404,
              message: e.to_s
            }
          }
        rescue ActiveRecord::RecordInvalid => e
          @sections = {
            error: {
              status: 422,
              message: e.to_s
            }
          }
        end
        render json: @sections
      end

      # DELETE /sections/1
      def destroy
        @section.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_section
        @section = Section.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def section_params
        # params.require(:section).permit(:header, :description, :gig_id)
        params.permit(section: [:id, :header, :description, :gig_id, { bullets: [] }]).require(:section)
      end
    end
  end
end
