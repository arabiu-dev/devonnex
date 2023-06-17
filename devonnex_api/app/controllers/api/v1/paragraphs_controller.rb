# frozen_string_literal: true

module Api
  module V1
    class ParagraphsController < ApplicationController
      before_action :set_paragraph, only: %i[show update destroy]

      # GET /paragraphs
      def index
        @paragraphs = Paragraph.order(:order)

        render json: @paragraphs
      end

      # GET /paragraphs/1
      def show
        render json: @paragraph
      end

      # POST /paragraphs
      def create
        begin
          Paragraph.transaction do
            @paragraph = Paragraph.create!(paragraph_params)
          end
        rescue ActiveRecord::RecordInvalid => e
          # omitting the exception type rescues all StandardErrors
          @paragraph = {
            error: {
              status: 422,
              message: e
            }
          }
        end
        render json: @paragraph
      end

      # PATCH/PUT /paragraphs
      def batch_update
        begin
          Paragraph.transaction do
            paragraph_params.each do |paragraph_param|
              paragraph = Paragraph.find_or_create_by(id: paragraph_param[:id])
              paragraph.update!(paragraph_param.except(:id))
            end
          end
          @paragraphs = Paragraph.where(id: paragraph_params.map { |param| param[:id] })
        rescue ActiveRecord::RecordNotFound => e
          @paragraphs = {
            error: {
              status: 404,
              message: e.to_s
            }
          }
        rescue ActiveRecord::RecordInvalid => e
          @paragraphs = {
            error: {
              status: 422,
              message: e.to_s
            }
          }
        end
        render json: @paragraphs
      end

      # DELETE /paragraphs/1
      def destroy
        @paragraph.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_paragraph
        @paragraph = Paragraph.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def paragraph_params
        # params.require(:paragraph).permit(:content, :order, :post_id)
        params.permit(paragraph: %i[content order post_id id]).require(:paragraph)
      end
    end
  end
end
