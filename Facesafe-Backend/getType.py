def getIDType(imgID):
    firstAlpha = imgID[0]
    if(firstAlpha=='R'):
        type = "resident"
    elif(firstAlpha=='S'):
        type = "staff"
    elif(firstAlpha=='F'):
        type = "family"
    else:
        type = "visitor"


    return type
