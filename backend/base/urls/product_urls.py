from django.urls import path
from base.views import products_views as views


urlpatterns = [

    path('', views.getProducts, name= 'products'),
    path('<str:pk>/', views.getProduct, name= 'product') #to make dyanmaic urls str:pk

]
