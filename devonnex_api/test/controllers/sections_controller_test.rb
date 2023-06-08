# frozen_string_literal: true

require 'test_helper'

class SectionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @section = sections(:one)
  end

  test 'should get index' do
    get sections_url, as: :json
    assert_response :success
  end

  test 'should create section' do
    assert_difference('Section.count') do
      post sections_url,
           params: { section: { description: @section.description, gig_id: @section.gig_id, header: @section.header } }, as: :json
    end

    assert_response :created
  end

  test 'should show section' do
    get section_url(@section), as: :json
    assert_response :success
  end

  test 'should update section' do
    patch section_url(@section),
          params: { section: { description: @section.description, gig_id: @section.gig_id, header: @section.header } }, as: :json
    assert_response :success
  end

  test 'should destroy section' do
    assert_difference('Section.count', -1) do
      delete section_url(@section), as: :json
    end

    assert_response :no_content
  end
end
