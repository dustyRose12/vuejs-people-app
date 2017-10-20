class Person < ApplicationRecord
  validates :name, presence: true
  validates :bio, presense: true
end
