# frozen_string_literal: true

require 'test_helper'

class ReviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @review = reviews(:one)
  end

  test 'should get index' do
    get reviews_url, as: :json
    assert_response :success
  end

  test 'should create review' do
    assert_difference('Review.count') do
      post reviews_url,
           params: { review: { content: @review.content, from_user: @review.from_user, gig_id: @review.gig_id, to_user: @review.to_user } }, as: :json
    end

    assert_response :created
  end

  test 'should show review' do
    get review_url(@review), as: :json
    assert_response :success
  end

  test 'should update review' do
    patch review_url(@review),
          params: { review: { content: @review.content, from_user: @review.from_user, gig_id: @review.gig_id, to_user: @review.to_user } }, as: :json
    assert_response :success
  end

  test 'should destroy review' do
    assert_difference('Review.count', -1) do
      delete review_url(@review), as: :json
    end

    assert_response :no_content
  end
end
