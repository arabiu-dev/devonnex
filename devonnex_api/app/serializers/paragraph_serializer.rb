# frozen_string_literal: true

class ParagraphSerializer < ActiveModel::Serializer
  attributes :id, :content, :order

  belongs_to :post
end
