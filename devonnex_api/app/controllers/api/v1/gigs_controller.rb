# frozen_string_literal: true

module Api
  module V1
    class GigsController < ApplicationController
      before_action :set_gig, only: %i[show update destroy]

      # GET /gigs
      def index
        # @gigs = Gig.includes(:user).page(params[:page]).per(5)
        # total_count = Gig.count

        @gigs = Gig.eager_load(:user).order(created_at: :desc)

        # Apply filters if provided
        @gigs = apply_filters(@gigs, params[:filter]) if params[:filter]

        # Apply pagination
        @gigs = @gigs.page(params[:page]).per(5)

        render json: {
          gigs: ActiveModelSerializers::SerializableResource.new(@gigs, each_serializer: GigSerializer,
                                                                        include: ['user']),
          total_count: @gigs.total_count,
          current_page: @gigs.current_page,
          per_page: @gigs.limit_value,
          total_pages: @gigs.total_pages
        }
      end

      # GET /gigs/1
      def show
        render json: @gig, each_serializer: GigSerializer,
               include: ['user', 'sections', 'reviews',
                         'reviews.user', 'proposals', 'proposals.user',
                         'proposals.proposal_sections']
      end

      # POST /gigs
      def create
        @gig = Gig.new(gig_params)

        @gig.update(status: 'Open')
        if @gig.save
          render json: @gig, status: :created
        else
          render json: @gig.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /gigs/1
      def update
        if @gig.update(gig_params)
          render json: @gig
        else
          render json: @gig.errors, status: :unprocessable_entity
        end
      end

      # DELETE /gigs/1
      def destroy
        @gig.destroy
      end

      def user_gigs
        user_id = params[:user_id]
        username = params[:username]

        @gigs = Gig.where('user_id = ? OR offered_to = ?', user_id, username)

        render json: @gigs
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_gig
        @gig = Gig.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def gig_params
        params.require(:gig).permit(:id, :title, :location, :payment_amount, :payment_per, :duration, :overview,
                                    :no_of_freelancers, :user_id, :category, :offered_to, :status)
      end

      def apply_filters(gigs, filter)
        gigs = gigs.where('category LIKE ?', "%#{filter}%") if filter != 'All'
        gigs
      end
    end
  end
end
