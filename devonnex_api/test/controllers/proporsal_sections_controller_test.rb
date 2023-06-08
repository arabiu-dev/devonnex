# frozen_string_literal: true

require 'test_helper'

class ProposalSectionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @proporsal_section = proporsal_sections(:one)
  end

  test 'should get index' do
    get proporsal_sections_url, as: :json
    assert_response :success
  end

  test 'should create proporsal_section' do
    assert_difference('ProposalSection.count') do
      post proporsal_sections_url,
           params: { proporsal_section: { description: @proporsal_section.description, order: @proporsal_section.order, proporsal_id: @proporsal_section.proporsal_id } }, as: :json
    end

    assert_response :created
  end

  test 'should show proporsal_section' do
    get proporsal_section_url(@proporsal_section), as: :json
    assert_response :success
  end

  test 'should update proporsal_section' do
    patch proporsal_section_url(@proporsal_section),
          params: { proporsal_section: { description: @proporsal_section.description, order: @proporsal_section.order, proporsal_id: @proporsal_section.proporsal_id } }, as: :json
    assert_response :success
  end

  test 'should destroy proporsal_section' do
    assert_difference('ProposalSection.count', -1) do
      delete proporsal_section_url(@proporsal_section), as: :json
    end

    assert_response :no_content
  end
end
