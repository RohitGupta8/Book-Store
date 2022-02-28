/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Cart from '../models/cart.model';
import Book from '../models/book.model';
import logger from '../config/logger'
/**
 * Service For Add To Cart
 * @param {object} cart cart object
 * @returns
 */
export const addToCart = async (cart) => {
    try {
        const bookData = await Book.findById({ _id: cart.bookId });
        if (bookData.quantity === 0) {
            return `${bookData.title} is currently out of stock, please come back later.`;
        } else if (cart.quantity > bookData.quantity) {
            return `Please select quantity less than ${bookData.quantity}.`;
        } else {
            const checkCart = await Cart.findOne({ userId: cart.userId });
            if (checkCart) {
                //Adding the quantity of the book
                checkCart.totalQuantity = checkCart.totalQuantity + cart.quantity;
                const finalQuantity = checkCart.totalQuantity;
                //Price of books for the quantity
                const bookPrice = cart.quantity * bookData.price;
                //Total Price of books in the cart
                let priceArray = checkCart.prices;
                priceArray.push(bookPrice);
                let totalPrice = 0;
                for (let i = 0; i <= priceArray.length - 1; i++) {
                    totalPrice = totalPrice + priceArray[i];
                }
                const finalPrice = totalPrice;
                //Object
                const data = {
                    userId: cart.userId,
                    bookId: [...checkCart.bookId, cart.bookId],
                    bookName: [...checkCart.bookName, bookData.title],
                    quantityPerBook: [...checkCart.quantityPerBook, cart.quantity],
                    totalQuantity: finalQuantity,
                    prices: [...checkCart.prices],
                    total: finalPrice,
                    isPurchased: false
                };
                //Mongoose query to update the cart
                const book = await Cart.findByIdAndUpdate({ _id: checkCart._id }, data, { new: true });
                //Update The Book Quantity In The Inventory
                const updatedData = {
                    author: bookData.author,
                    title: bookData.title,
                    image: bookData.image,
                    quantity: bookData.quantity - cart.quantity,
                    price: bookData.price,
                    description: bookData.description
                };
                await Book.findByIdAndUpdate(bookData._id, updatedData, { new: true });
                return book;
            } else {
                //Price of books for the quantity
                const bookPrice = cart.quantity * bookData.price;
                //Object
                const data = {
                    userId: cart.userId,
                    bookId: [cart.bookId],
                    bookName: [bookData.title],
                    quantityPerBook: [cart.quantity],
                    totalQuantity: cart.quantity,
                    prices: [bookPrice],
                    total: bookPrice,
                    isPurchased: false
                };
                //Mongoose query to create a cart if the cart is empty.
                const book = await Cart.create(data);
                //Update The Book Quantity In The Inventory
                const updatedData = {
                    author: bookData.author,
                    title: bookData.title,
                    image: bookData.image,
                    quantity: bookData.quantity - cart.quantity,
                    price: bookData.price,
                    description: bookData.description
                };
                await Book.findByIdAndUpdate(bookData._id, updatedData, { new: true });
                return book;
            }
        }
    } catch (error) {
        logger.error(error);
        throw new Error(`Cannot add the book to cart!`);
    }
};

/**
 * Service for Remove From Cart
 * @param {object} body - body object
 * @returns
 */
export const removeBookFromCart = async (body) => {
    try {
        const cartData = await Cart.findOne({ userId: body.userId });
        if (!cartData) {
            return 'Cart is empty.';
        } else {
            //Cloning the arrays
            const BookNameArray = [...cartData.bookName];
            const IdArray = [...cartData.bookId];
            const QtyArray = [...cartData.quantityPerBook];
            const PricesArray = [...cartData.prices];

            //Getting The Index
            const index = BookNameArray.indexOf(body.title);
            const currentQty = cartData.quantityPerBook[index] - body.quantity;
            if (body.quantity > cartData.quantityPerBook[index] || body.quantity > cartData.totalQuantity) {
                return 'Invalid quantity.';
            } else if (cartData.quantityPerBook[index] - body.quantity !== 0) {
                BookNameArray[index] = body.title;
                IdArray[index] = cartData.bookId[index];
                QtyArray[index] = currentQty;
                PricesArray[index] = (cartData.prices[index] / cartData.quantityPerBook[index]) * currentQty;

                cartData.totalQuantity = cartData.totalQuantity - body.quantity;

                let totalPrice = 0;
                for (let i = 0; i <= PricesArray.length - 1; i++) {
                    totalPrice = totalPrice + PricesArray[i];
                }
                const finalPrice = totalPrice;

                const updatedCartData = {
                    userId: body.userId,
                    bookId: IdArray,
                    bookName: BookNameArray,
                    quantityPerBook: QtyArray,
                    totalQuantity: cartData.totalQuantity,
                    prices: PricesArray,
                    total: finalPrice,
                    isPurchased: false
                };

                const data = await Cart.findByIdAndUpdate(cartData._id, updatedCartData, { new: true });

                const idOfBookToUpdate = cartData.bookId[index];

                const bookData = await Book.findById({ _id: idOfBookToUpdate });

                const updatedBookData = {
                    author: bookData.author,
                    title: bookData.title,
                    image: bookData.image,
                    quantity: bookData.quantity + body.quantity,
                    price: bookData.price,
                    description: bookData.description
                };

                await Book.findByIdAndUpdate(idOfBookToUpdate, updatedBookData, { new: true });
                return data;
            } else {
                const idOfBookToUpdate = cartData.bookId[index];
                //Deleting Data from Particular Index
                BookNameArray.splice(index, 1);
                IdArray.splice(index, 1);
                QtyArray.splice(index, 1);
                PricesArray.splice(index, 1);
                cartData.totalQuantity = cartData.totalQuantity - body.quantity;
                //Calculating Total Price
                let totalPrice = 0;
                for (let i = 0; i <= PricesArray.length - 1; i++) {
                    totalPrice = totalPrice + PricesArray[i];
                }
                const finalPrice = totalPrice;
                //Object To Update Cart
                const updatedCartData = {
                    userId: body.userId,
                    bookId: IdArray,
                    bookName: BookNameArray,
                    quantityPerBook: QtyArray,
                    totalQuantity: cartData.totalQuantity,
                    prices: PricesArray,
                    total: finalPrice,
                    isPurchased: false
                };

                const data = await Cart.findByIdAndUpdate(cartData._id, updatedCartData, { new: true });

                const bookData = await Book.findById({ _id: idOfBookToUpdate });
                //Object To Update Main Inventory
                const updatedBookData = {
                    author: bookData.author,
                    title: bookData.title,
                    image: bookData.image,
                    quantity: bookData.quantity + body.quantity,
                    price: bookData.price,
                    description: bookData.description
                };

                await Book.findByIdAndUpdate(idOfBookToUpdate, updatedBookData, { new: true });
                return data;
            }
        }
    } catch (error) {
        logger.error(error);
        return 'Cannot remove book from cart';
    }
};

/**
 * Service for confirm booking
 * @param {id} id cart's id
 * @returns 
 */
export const confirmBooking = async (id) => {
    try {
        const checkCart = await Cart.findById(id);
        if (checkCart.totalQuantity === 0) {
            return 'Add The Book.';
        } else {
            const data = {
                userId: checkCart.userId,
                bookId: [],
                bookName: [],
                quantityPerBook: [],
                totalQuantity: 0,
                prices: [],
                total: 0,
                isPurchased: true
            };
            const checkout = await Cart.findByIdAndUpdate(id, data, { new: true });
            return checkout;
        }
    } catch (error) {
        logger.error(error);
        return 'Cannot check out your order.';
    }
};

/**
 * Service for view cart
 * @param id- user id
 * @returns 
 */
export const viewCart = async (id) => {
    try {
        const cart = await Cart.findOne({ userId: id.userId });
        return cart;
    } catch (error) {
        logger.error(error);
        return 'Cannot view your cart'
    }
}