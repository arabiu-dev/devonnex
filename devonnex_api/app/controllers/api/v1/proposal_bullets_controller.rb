# frozen_string_literal: true

module Api
  module V1
    class ProposalBulletsController < ApplicationController
      before_action :set_proposal_bullet, only: %i[show update destroy]

      # GET /proposal_bullets
      def index
        @proposal_bullets = ProposalBullet.all

        render json: @proposal_bullets
      end

      # GET /proposal_bullets/1
      def show
        render json: @proposal_bullet
      end

      # POST /proposal_bullets
      def create
        @proposal_bullet = ProposalBullet.new(proposal_bullet_params)

        if @proposal_bullet.save
          render json: @proposal_bullet, status: :created, location: @proposal_bullet
        else
          render json: @proposal_bullet.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /proposal_bullets/1
      def update
        if @proposal_bullet.update(proposal_bullet_params)
          render json: @proposal_bullet
        else
          render json: @proposal_bullet.errors, status: :unprocessable_entity
        end
      end

      # DELETE /proposal_bullets/1
      def destroy
        @proposal_bullet.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_proposal_bullet
        @proposal_bullet = ProposalBullet.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def proposal_bullet_params
        params.require(:proposal_bullet).permit(:bullet, :proposal_section_id, :order)
      end
    end
  end
end
