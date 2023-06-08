# frozen_string_literal: true

module Api
  module V1
    class ProposalsController < ApplicationController
      before_action :set_proposal, only: %i[show update destroy]

      # GET /proposals
      def index
        @proposals = Proposal.all

        render json: @proposals
      end

      # GET /proposals/1
      def show
        render json: @proposal
      end

      # POST /proposals
      def create
        @proposal = Proposal.new(proposal_params)

        if @proposal.save
          render json: @proposal, status: :created
        else
          render json: @proposal.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /proposals/1
      def update
        if @proposal.update(proposal_params)
          render json: @proposal
        else
          render json: @proposal.errors, status: :unprocessable_entity
        end
      end

      # DELETE /proposals/1
      def destroy
        @proposal.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_proposal
        @proposal = Proposal.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def proposal_params
        params.require(:proposal).permit(:gig_id, :user_id)
      end
    end
  end
end
