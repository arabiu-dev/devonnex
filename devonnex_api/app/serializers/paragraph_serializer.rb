# frozen_string_literal: true

class ParagraphSerializer < ActiveModel::Serializer
  attributes :id, :content, :order, :created_at

  belongs_to :post
end
