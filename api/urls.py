from django.urls import path
from .views import getrouters,getnotes,getnote,updateNote,deleteNote

urlpatterns = [
    path('',getrouters,name="routers"),
    path('notes/',getnotes,name="notes"),
    # path('notes/create/',createNote,name="create-note"),
    path('notes/<str:pk>/update/',updateNote,name="update-note"),
    path('notes/<str:pk>/delete/',deleteNote,name="delete-note"),
    path('notes/<str:pk>/',getnote,name="note"),
]
