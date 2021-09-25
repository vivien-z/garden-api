Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy'
  end
  # devise_for :users do
  #   get '/users/sign_out' => 'devise/sessions#destroy'
  #   get '/users/:id' => 'users#show'
  # end
  # devise_for :users do
  #   # get 'logout', to: "devise/sessions#destroy", as: "logout"
  #   # get 'logout', to: "users/sessions#destroy", as: "logout"
  #   get '/sign_out' => 'devise/sessions#destroy'
  # end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :plants, only: [ :index, :show, :update, :create, :destroy ]
    end
  end

  root to: 'pages#home'
  get 'api' => 'pages#api_doc'
# end
  # root to: 'plants#index'

  resources :users, only: [:show] do
    # get '/sign_out' => "devise/sessions#destroy"
    resources :gardens, only: [ :index, :new, :create ]
  end
  resources :gardens, only: [:show, :edit, :update, :destroy] do
    resources :plant_position_by_gardens, only: [:create]
  end

  resources :zones, only: [:create]
  resources :plants, only: [:index, :show, :new, :create] do
    resources :plant_info_by_zones, only: [ :index, :new, :create ]
    resources :collections, only: [:create]
  end
  resources :plant_info_by_zones, only: [ :show, :update, :edit ]
  resources :collections, only: [:edit, :update, :destroy]

end
