import qrcode
import Image
data = input("Enter Link or data to convert :\n")
i = qrcode.QRCode(box_size = 40,border = 1)
i.add_data(data)
i.make(fit = True)

j = i.make_image(fill_color = 'black',back_color = 'white')
j.save('image.png')
