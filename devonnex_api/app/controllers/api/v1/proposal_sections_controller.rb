# frozen_string_literal: true

module Api
  module V1
    class ProposalSectionsController < ApplicationController
      before_action :set_proposal_section, only: %i[show update destroy]

      # GET /proposal_sections
      def index
        @proposal_sections = ProposalSection.all

        render json: @proposal_sections
      end

      # GET /proposal_sections/1
      def show
        render json: @proposal_section
      end

      # POST /proposal_sections
      def create
        begin
          ProposalSection.transaction do
            @proposal_section = ProposalSection.create!(proposal_section_params)
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
        render json: @proposal_section
      end

      # PATCH/PUT /proposal_sections/1
      def update
        if @proposal_section.update(proposal_section_params)
          render json: @proposal_section
        else
          render json: @proposal_section.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /sections
      def batch_update
        begin
          ProposalSection.transaction do
            proposal_section_params.each do |section_param|
              section = ProposalSection.find_or_create_by(id: section_param[:id])
              section.update!(section_param.except(:id))
            end
          end
          @proposal_section = ProposalSection.where(id: proposal_section_params.map { |param| param[:id] })
        rescue ActiveRecord::RecordNotFound => e
          @proposal_section = {
            error: {
              status: 404,
              message: e.to_s
            }
          }
        rescue ActiveRecord::RecordInvalid => e
          @proposal_section = {
            error: {
              status: 422,
              message: e.to_s
            }
          }
        end
        render json: @proposal_section
      end

      # DELETE /proposal_sections/1
      def destroy
        @proposal_section.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_proposal_section
        @proposal_section = ProposalSection.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def proposal_section_params
        params.permit(proposal_section: [:id, :header, :description, :proposal_id,
                                         { bullets: [] }]).require(:proposal_section)
      end
    end
  end
end
