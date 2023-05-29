from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import TicketSerializer
from .models import Ticket
from rest_framework.permissions import IsAuthenticated
"""
Below Function going to display all the tasks store in the data base.
"""


@api_view(['GET'])
def ticketList(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ticketDetail(request, pk):
    tickets = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(tickets, many=False)
    return Response(serializer.data)


@api_view(['POST', 'PUT'])
def ticketUpdate(request, pk):
    ticket = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def ticketDelete(request, pk):
    ticket = Ticket.objects.get(id=pk)
    ticket.delete()
    return Response("Tickets deleted successfully.")
