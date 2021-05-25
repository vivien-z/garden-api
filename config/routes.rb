Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do

      resources :plants, only: [ :index, :show, :update, :create ]
    end
  end

  root to: 'pages#home'
  get 'api' => 'pages#api_instruction'

  resources :plants, only: [:index, :show, :new, :create]
end
