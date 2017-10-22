class Api::V1::PeopleController < ApplicationController

  def index
    @people = Person.all
  end
  def create
    @person = Person.new(
                                          name: params[:name],
                                          bio: params[:bio]
                                          )
    if @person.save
      render :show
    else
      render json: {errors: @person.errors.full_messages }, status: 422
    end

  end

  def destroy
    @person = Person.find(params[:id])
    @person.destroy

    #come back 
    #sample message for when you delete
    # render json: {message: "You're doing great"}, status: 200

    #this is so that you visually get the new array on the page after you delete from the database via the ajax request
    @people = Person.all
    render :index

  end

end





