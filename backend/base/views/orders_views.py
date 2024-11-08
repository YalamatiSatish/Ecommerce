from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

#JWT token information
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['POST'])
@permission_classes([ IsAuthenticated ])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems'] 

    print(user, data)
    if orderItems and len(orderItems) == 0 :
        return Response({ 'detail': 'No Order Items present'}, status = status.HTTP_400_BAD_REQUEST )
    else :
        # 1) Create Order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxprice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
            #isPaid = 
            #paidAt = 
            #isDelivered = 
            #deliveredAt = 
            #createdAt =
            #_id = 
        )
        # 2) Shipping Address
        shipping =  ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'], 
            city = data['shippingAddress']['city'], 
            postalCode = data['shippingAddress']['postalCode'], 
            country = data['shippingAddress']['country'], 
            #shippingPrice = data['shippingAddress']['shippingPrice'], 
        )
        # 3) Create Order Items add set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get( _id= i['_id'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'] ,
                price = i['price'] ,
                image = product.image.url,
            )

        # 4) Update stock present with us
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return  Response(serializer.data)