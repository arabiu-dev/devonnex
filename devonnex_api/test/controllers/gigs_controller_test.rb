# frozen_string_literal: true

require 'test_helper'

class GigsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gig = gigs(:one)
  end

  test 'should get index' do
    get gigs_url, as: :json
    assert_response :success
  end

  test 'should create gig' do
    assert_difference('Gig.count') do
      post gigs_url,
           params: { gig: { duration: @gig.duration, location: @gig.location, overview: @gig.overview, payment_amount: @gig.payment_amount, payment_per: @gig.payment_per, title: @gig.title } }, as: :json
    end

    assert_response :created
  end

  test 'should show gig' do
    get gig_url(@gig), as: :json
    assert_response :success
  end

  test 'should update gig' do
    patch gig_url(@gig),
          params: { gig: { duration: @gig.duration, location: @gig.location, overview: @gig.overview, payment_amount: @gig.payment_amount, payment_per: @gig.payment_per, title: @gig.title } }, as: :json
    assert_response :success
  end

  test 'should destroy gig' do
    assert_difference('Gig.count', -1) do
      delete gig_url(@gig), as: :json
    end

    assert_response :no_content
  end
end
