document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Cart Modal
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.innerHTML = `
        <div class="modal-content" style="display: block; overflow-y: auto; max-height: 90vh; padding: 0; border-radius: 15px; background: #fff;">
            <!-- Header -->
            <div style="position: sticky; top: 0; background: white; z-index: 100; padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="font-family: 'Playfair Display', serif; margin: 0; font-size: 1.5rem; color: #6b0f1a;">Your Basket</h2>
                <span class="close-btn" onclick="document.getElementById('cartModal').style.display='none'" style="cursor:pointer; font-size:24px; color: #666;">&times;</span>
            </div>

            <div style="padding: 20px;">
                <!-- STEP 1: Cart Items -->
                <div id="cartStep1">
                    <div id="cartItems"></div>
                    
                    <!-- Empty Cart State (Will be injected by script if empty) -->
                    
                    <div id="cartFooterStep1" style="margin-top: 20px; border-top: 2px solid #f8f9fa; padding-top: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <span style="font-size: 1.1rem; color: #666;">Total Amount</span>
                            <span style="font-size: 1.4rem; font-weight: bold; color: #6b0f1a;">₹<span id="cartTotal">0.00</span></span>
                        </div>
                        <button onclick="window.goToCheckoutStep2()" style="width: 100%; background: #6b0f1a; color: white; padding: 15px; border: none; border-radius: 10px; font-weight: bold; font-size: 1rem; cursor: pointer; transition: 0.3s; display: flex; justify-content: center; align-items: center; gap: 10px;">
                            Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                <!-- STEP 2: Checkout Form -->
                <div id="cartStep2" style="display: none;">
                    <div style="margin-bottom: 20px;">
                        <button onclick="window.goToCheckoutStep1()" style="background: none; border: none; color: #666; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; gap: 5px; padding: 0;">
                            <i class="fa-solid fa-arrow-left"></i> Back to Cart
                        </button>
                    </div>

                    <div class="checkout-form">
                        <h3 style="font-family: 'Playfair Display', serif; color: #6b0f1a; margin-bottom: 15px;">Checkout Details</h3>
                        
                        <!-- Delivery Type Selection -->
                        <div style="background:#fff; padding:10px; border-radius:10px; margin-bottom:15px; border:1px solid #eee; display:flex; gap:10px;">
                            <label style="flex:1; cursor:pointer; display:flex; align-items:center; gap:5px; padding:10px; border:1px solid #ddd; border-radius:8px; transition:0.3s; background:#fff;" id="labelSelfPickup" onclick="window.toggleDeliveryType('Self Pickup')">
                                <input type="radio" name="deliveryType" value="Self Pickup" style="accent-color:#6b0f1a;">
                                <span style="font-weight:bold; font-size:0.9rem;">🏬 Self Pickup</span>
                            </label>
                            <label style="flex:1; cursor:pointer; display:flex; align-items:center; gap:5px; padding:10px; border:1px solid #ddd; border-radius:8px; transition:0.3s; background:#f0f8ff; border-color:#6b0f1a;" id="labelHomeDelivery" onclick="window.toggleDeliveryType('Home Delivery')">
                                <input type="radio" name="deliveryType" value="Home Delivery" checked style="accent-color:#6b0f1a;">
                                <span style="font-weight:bold; font-size:0.9rem;">🏠 Home Delivery</span>
                            </label>
                        </div>
                        
                        <input id="custName" type="text" placeholder="Full Name" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid #ddd; border-radius:8px; background: #f9f9f9;">
                        <input id="custPhone" type="text" placeholder="Phone Number" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid #ddd; border-radius:8px; background: #f9f9f9;">
                        
                        <!-- WRAPPER FOR ADDRESS SECTION -->
                        <div id="deliveryAddressSection">
                            <!-- Structured Address Fields -->
                            <div style="background:#fff; border: 1px solid #eee; padding:15px; border-radius:10px; margin-bottom:15px; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                                <h4 style="margin:0 0 12px 0; color:#495057; font-size:0.9rem; font-weight:600; text-transform: uppercase; letter-spacing: 0.5px;">📍 Delivery Address</h4>
                                
                                <input id="streetName" type="text" placeholder="Street Name / House No. / Building" style="width:100%; padding:10px; margin-bottom: 10px; border:1px solid #ddd; border-radius:6px;">
                                
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                                    <input id="city" type="text" placeholder="City" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                                    <input id="taluka" type="text" placeholder="Taluka" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                                </div>
                                
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
                                    <input id="district" type="text" placeholder="District" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                                    <input id="state" type="text" placeholder="State" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                                </div>
                                
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                                    <input id="pincode" type="text" placeholder="Pincode" maxlength="6" pattern="[0-9]{6}" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                                    <input id="landmark" type="text" placeholder="Landmark (Optional)" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:6px;">
                                </div>
                            </div>
                            
                            <!-- Location Selection -->
                            <div style="margin-bottom: 20px;">
                                <input id="mapLocation" type="text" placeholder="Select Delivery Location on Map" readonly style="width:100%; padding:12px; margin-bottom:10px; border:1px dashed #6b0f1a; border-radius:8px; background:#fff0f0; color:#6b0f1a; cursor: pointer;" onclick="window.openMapModal()">
                                
                                <div style="display: flex; gap: 10px;">
                                    <button onclick="window.getUserLocation()" style="flex:1; background:#fff; color:#28a745; border: 1px solid #28a745; padding:10px; border-radius:8px; cursor:pointer; font-size:0.9rem; font-weight:500;">
                                        <i class="fa-solid fa-location-crosshairs"></i> Locate Me
                                    </button>
                                    <button onclick="window.openMapModal()" style="flex:1; background:#fff; color:#007bff; border: 1px solid #007bff; padding:10px; border-radius:8px; cursor:pointer; font-size:0.9rem; font-weight:500;">
                                        <i class="fa-solid fa-map"></i> Open Map
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Hidden coordinate inputs -->
                            <input type="hidden" id="custLat" name="custLat">
                            <input type="hidden" id="custLng" name="custLng">
                        </div>
                        
                        <div id="deliveryInfo" style="background:#f8f9fa; padding:15px; border-radius:10px; margin-bottom:20px; border-left: 4px solid #6b0f1a; display:none;">
                             <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                <span style="color: #666;">Delivery Distance</span>
                                <span id="distanceDisplay" style="font-weight: bold;">-</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                <span style="color: #666;">Delivery Charge</span>
                                <span id="deliveryCharge" style="color:#6b0f1a; font-weight:bold;">₹0.00</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; border-top: 1px dashed #ddd; margin-top: 5px; padding-top: 5px;">
                                <span style="font-weight: bold;">Final Total</span>
                                <span id="totalWithDelivery" style="color:#6b0f1a; font-weight:bold; font-size: 1.1rem;">₹0.00</span>
                            </div>
                        </div>

                        <!-- T&C Checkbox -->
                        <div style="margin-bottom: 15px; display: flex; align-items: start; gap: 10px; background: #fff0f0; padding: 10px; border-radius: 8px; border: 1px solid #ffcccc;">
                            <input type="checkbox" id="termsCheckbox" style="margin-top: 3px; accent-color: #6b0f1a; width: 18px; height: 18px; cursor: pointer;">
                            <label for="termsCheckbox" style="font-size: 0.9rem; color: #555; cursor: pointer; line-height: 1.4;">
                                <strong>By placing this order, I acknowledge that the order cannot be cancelled after confirmation</strong>
                            </label>
                        </div>
                        
                        <button class="order-btn-main" onclick="window.placeOrder('COD')" style="width:100%; background: linear-gradient(135deg, #6b0f1a 0%, #4a0a12 100%); color:white; padding:15px; border:none; border-radius:10px; font-weight:bold; font-size: 1.1rem; cursor:pointer; box-shadow: 0 4px 15px rgba(107, 15, 26, 0.3);">
                            Confirm Order (COD) <i class="fa-solid fa-check-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    // 2. Inject Profile Modal
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.innerHTML = `
        <div class="modal-content" style="display: block; overflow-y: auto; max-height: 90vh; padding: 20px;">
            <div style="position: sticky; top: -20px; background: white; z-index: 100; padding-bottom: 10px; border-bottom: 1px solid #eee; margin-bottom: 15px;">
                <span class="close-btn" onclick="document.getElementById('profileModal').style.display='none'" style="position:absolute; right:0; top:5px; cursor:pointer; font-size:24px;">&times;</span>
                <h2 style="font-family: 'Playfair Display', serif; text-align:center; margin: 10px 0 0 0;">My Orders</h2>
            </div>
            <div id="myOrdersList"></div>
        </div>`;
    }

    // 3. Inject Map Modal
    const mapModalHTML = `
    <div id="mapModal" class="modal" style="display:none; align-items:center; justify-content:center; background:rgba(0,0,0,0.8); z-index:10010;">
        <div class="modal-content" style="max-width:90%; width:600px; position:relative; padding:20px;">
            <span class="close-btn" onclick="document.getElementById('mapModal').style.display='none'">&times;</span>
            <h3 style="font-family:'Playfair Display'; color:#6b0f1a; text-align:center; margin-bottom:15px;">Select Delivery Location</h3>
            
            <!-- Search Box -->
            <div style="margin-bottom:15px;">
                <div style="display:flex; gap:10px;">
                    <input id="mapSearchInput" type="text" placeholder="Search for a location..." style="flex:1; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:14px;">
                    <button onclick="window.searchLocation()" style="background:#007bff; color:white; padding:10px 15px; border:none; border-radius:8px; cursor:pointer; font-size:14px;">
                        🔍 Search
                    </button>
                </div>
                <div id="searchResults" style="margin-top:10px; max-height:150px; overflow-y:auto; display:none;"></div>
            </div>
            
            <div id="map" style="height:400px; border-radius:10px; margin-bottom:15px;"></div>
            <div style="text-align:center;">
                <button onclick="window.confirmMapLocation()" style="background:#6b0f1a; color:white; padding:10px 20px; border:none; border-radius:8px; cursor:pointer;">
                    Confirm Location
                </button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', mapModalHTML);
});

// --- Data Rendering Logic ---
window.openCart = function() {
    const modal = document.getElementById('cartModal');
    const list = document.getElementById('cartItems');
    const totalDisplay = document.getElementById('cartTotal');
    if(!modal || !list) return;
    
    modal.style.display = 'flex';
    list.innerHTML = "";
    let total = 0;
    const cartIds = Object.keys(cart || {});
    
    if(cartIds.length === 0) {
        list.innerHTML = `
            <div style="text-align:center; padding: 40px 20px;">
                <div style="font-size: 3rem; margin-bottom: 20px; color: #eee;">🛒</div>
                <h3 style="color: #6b0f1a; margin-bottom: 10px;">Your Basket is Empty</h3>
                <p style="color: #999; margin-bottom: 20px;">Looks like you haven't added any sweet treats yet.</p>
                <button onclick="document.getElementById('cartModal').style.display='none'" style="background: white; border: 1px solid #6b0f1a; color: #6b0f1a; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; transition: 0.3s;">Start Shopping</button>
            </div>`;
        if(totalDisplay) totalDisplay.innerText = "0.00";
        document.getElementById('cartFooterStep1').style.display = 'none';
        return;
    }
    
    // Reset to Step 1
    document.getElementById('cartStep1').style.display = 'block';
    document.getElementById('cartStep2').style.display = 'none';
    document.getElementById('cartFooterStep1').style.display = 'block';
    
    cartIds.forEach(id => {
        let item = dbMenuItems.find(i => i.id == id);
        if(item) {
            let itemTotal = item.price * cart[id];
            total += itemTotal;
            // Clean Item Row
            list.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding:12px; background:#f9f9f9; border-radius:10px; border:1px solid #eee;">
                <div style="flex:1;">
                    <strong style="font-size:0.9rem; display:block;">${item.name}</strong>
                    <small style="color:#666;">₹${item.price} x ${cart[id]}</small>
                </div>
                <div style="display:flex; align-items:center; gap:8px; margin: 0 10px;">
                    <button onclick="window.modifyQty(${item.id}, -1); window.openCart();" style="width:28px; height:28px; border-radius:5px; border:1px solid #ddd; background:white; cursor:pointer;">-</button>
                    <span style="font-weight:bold; min-width:20px; text-align:center;">${cart[id]}</span>
                    <button onclick="window.modifyQty(${item.id}, 1); window.openCart();" style="width:28px; height:28px; border-radius:5px; border:1px solid #ddd; background:white; cursor:pointer;">+</button>
                </div>
                <div style="font-weight:bold; color:#6b0f1a; min-width:70px; text-align:right;">₹${itemTotal.toFixed(2)}</div>
            </div>`;
        }
    });
    if(totalDisplay) totalDisplay.innerText = total.toFixed(2);
};

window.openProfile = function() {
    const modal = document.getElementById('profileModal');
    const list = document.getElementById('myOrdersList');
    if(!modal || !list) return;
    
    modal.style.display = 'flex';
    list.innerHTML = "<p style='text-align:center; padding:20px;'>Loading your orders...</p>";
    
    let savedIds = JSON.parse(localStorage.getItem('my_orders') || "[]");
    if(savedIds.length === 0) {
        list.innerHTML = "<p style='text-align:center; color:#999; padding:20px;'>No orders found.</p>";
        return;
    }
    
    list.innerHTML = "";
    savedIds.slice().reverse().forEach(id => {
        db.collection("orders").doc(id).onSnapshot(doc => {
            if(doc.exists) {
                const order = doc.data();
                const statusColor = order.status === 'Accepted' ? '#059669' : (order.status === 'Rejected' ? '#ef4444' : '#d97706');
                
                // --- Date aur Time Format Logic ---
                let date = 'No date';
                let time = '';
                
                if (order.timestamp) {
                    try {
                        const orderDate = new Date(order.timestamp.seconds * 1000);
                        date = orderDate.toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        });
                        time = orderDate.toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        console.log('Modal-Injector Formatted date:', date);
                        console.log('Modal-Injector Formatted time:', time);
                    } catch (error) {
                        console.error('Modal-Injector Error formatting timestamp:', error);
                        date = 'Invalid date';
                    }
                } else {
                    console.log('Modal-Injector: No timestamp found in order data');
                }

                const html = `
                <div id="order-row-${id}" style="background:#fff; border:1px solid #eee; padding:15px; border-radius:12px; margin-bottom:12px; border-left:5px solid #6b0f1a;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; flex-wrap:wrap; gap:5px;">
                        <strong style="font-size:0.75rem; color:#6b0f1a; word-break:break-all; flex:1; min-width:120px;">${id}</strong>
                        <div style="text-align:right; background:#f9f9f9; padding:5px 8px; border-radius:5px; flex-shrink:0;">
                            <span style="font-size:0.8rem; color:#333; font-weight:500;">${date}</span>
                            ${time ? `<br><span style="font-size:0.7rem; color:#666; font-weight:400;">${time}</span>` : ''}
                        </div>
                    </div>
                    
                    <div style="font-size:0.85rem; color:#666; margin-bottom:10px; line-height:1.4;">
                        ${order.items ? (Array.isArray(order.items) ? order.items.map(i => `${i.qty}x ${i.name}`).join(', ') : 'Order details unavailable') : 'No items'}
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                        <strong style="color:#6b0f1a; font-size:0.9rem;">₹${order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</strong>
                        <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
                            <button onclick="viewOrderBill('${id}')" style="background:linear-gradient(135deg, #28a745, #20c997); color:white; border:none; padding:6px 10px; border-radius:6px; cursor:pointer; font-size:0.7rem; font-weight:600; box-shadow:0 2px 4px rgba(40,167,69,0.3); transition:all 0.3s ease; min-width:60px; white-space:nowrap;" title="View Bill">
                                🧾 Bill
                            </button>
                            <a href="/Pages/tracking.html?id=${id}" style="background:linear-gradient(135deg, #6b0f1a, #8b2530); color:white; text-decoration:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:0.7rem; font-weight:600; box-shadow:0 2px 4px rgba(107,15,26,0.3); transition:all 0.3s ease; border:1px solid #6b0f1a; min-width:60px; white-space:nowrap; text-align:center; display:inline-block;">
                                Track
                            </a>
                        </div>
                    </div>
                </div>`;
                
                const existing = document.getElementById(`order-row-${id}`);
                if(existing) existing.outerHTML = html;
                else list.insertAdjacentHTML('beforeend', html);
            }
        });
    });
};

// --- BILL VIEW FUNCTION ---
window.viewOrderBill = function(orderId) {
    console.log("Viewing bill for order:", orderId);
    
    // Show loading state
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Show loading message
    document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5;">
            <div style="text-align: center; padding: 40px; background: white; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                <div style="font-size: 48px; margin-bottom: 20px;">🧾</div>
                <h2>Generating Bill...</h2>
                <p style="color: #666; margin-top: 10px;">Please wait while we prepare your bill</p>
                <div style="margin-top: 20px;">
                    <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #6b0f1a; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </div>
        </div>
    `;
    
    // Wait a moment for bill.js to load, then generate bill
    setTimeout(() => {
        if (window.billGenerator && window.billGenerator.generateBill) {
            window.billGenerator.generateBill(orderId);
        } else if (window.generateBill) {
            window.generateBill(orderId);
        } else {
            // Fallback - try to reload bill.js
            const script = document.createElement('script');
            script.src = 'bill.js';
            script.onload = function() {
                if (window.billGenerator && window.billGenerator.generateBill) {
                    window.billGenerator.generateBill(orderId);
                } else {
                    showError();
                }
            };
            script.onerror = showError;
            document.head.appendChild(script);
        }
    }, 500);
    
    function showError() {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5;">
                <div style="text-align: center; padding: 40px; background: white; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                    <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                    <h2>Bill Generation Failed</h2>
                    <p style="color: #666; margin: 20px 0;">Unable to load bill generation system. Please refresh the page and try again.</p>
                    <button onclick="location.reload()" style="background: #6b0f1a; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer;">
                        Refresh Page
                    </button>
                    <button onclick="history.back()" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin-left: 10px;">
                        Go Back
                    </button>
                </div>
            </div>
        `;
    }
};

// modal-injector.js mein end mein ye add karein
// Success Modal ka HTML aur Functions
const successModalHTML = `
<div id="successModal" class="modal" style="display:none; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); position:fixed; top:0; left:0; width:100%; height:100%; z-index:999999;">
    <div style="background:#1a1a1a; color:white; padding:40px; border-radius:25px; text-align:center; border:2px solid #c5a059; max-width:380px; width:90%; position:relative;">
        <div style="font-size:4rem; margin-bottom:15px;">🍰</div>
        <h2 style="font-family:'Playfair Display'; color:#c5a059; margin-bottom:10px;">Sweet Success!</h2>
        <p style="color:#ccc; font-size:0.9rem; margin-bottom:5px;">Chef has received your order! 👨‍🍳</p>
        <div id="displayOrderId" style="background:#2a2a2a; padding:12px; border-radius:10px; margin:20px 0; font-family:monospace; font-size:1.1rem; border:1px dashed #c5a059; color:#fff;"></div>
        
        <div style="display:flex; gap:10px; margin-bottom:15px;">
            <button id="trackBtn" style="background:#c5a059; color:#1a1a1a; border:none; padding:12px 20px; border-radius:50px; font-weight:bold; cursor:pointer; flex:1; transition:0.3s; font-size:0.9rem; text-transform:uppercase;">
                Track Order →
            </button>
            <button id="downloadBillBtn" onclick="window.generateBill(document.getElementById('displayOrderId').textContent.replace('Order ID: ', '').replace('#', '').trim())" style="background:#10b981; color:white; border:none; padding:12px 20px; border-radius:50px; font-weight:bold; cursor:pointer; flex:1; transition:0.3s; font-size:0.9rem; text-transform:uppercase;">
                📄 Bill
            </button>
        </div>
        
        <p id="closeSuccess" style="margin-top:20px; font-size:0.8rem; color:#666; cursor:pointer; text-decoration:underline;">Close & Continue Shopping</p>
    </div>
</div>`;

document.body.insertAdjacentHTML('beforeend', successModalHTML);

// Functions ko fix karne ke liye Event Listeners ka use (Better than onclick)
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'trackBtn') {
        const orderIdText = document.getElementById('displayOrderId').innerText.replace('#', '').trim();
        // Seedha tracking.html par jump karein ID ke saath
        window.location.href = `tracking.html?id=${orderIdText}`;
    }
    
    if (e.target && e.target.id === 'closeSuccess') {
        document.getElementById('successModal').style.display = 'none';
    }
});

// Backup global function agar script.js se call karna ho
window.closeSuccessModal = function() {
    document.getElementById('successModal').style.display = 'none';
};

// --- AUTO-TRACKING LOGIC FOR MODAL JUMP ---
// Ye code check karega ki URL mein koi ID aayi hai ya nahi
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    let idFromUrl = urlParams.get('id');

    if (idFromUrl) {
        // CLEANING: Agar ID mein "Order ID:" likha ho toh usey hata do
        const cleanId = idFromUrl.replace(/Order\s*ID:\s*/gi, "").trim();

        const trackInput = document.getElementById('trackIdInput');
        if (trackInput) {
            trackInput.value = cleanId; // Input box mein sirf exact ID bharein
            
            // Firebase ko load hone ke liye thoda time dein, fir track karein
            setTimeout(() => {
                if (typeof window.trackOrder === 'function') {
                    window.trackOrder(); 
                }
            }, 600);
        }
    }
});

// --- Checkout Navigation Functions ---
window.goToCheckoutStep2 = function() {
    const totalText = document.getElementById('cartTotal').innerText;
    const total = parseFloat(totalText);

    if (total <= 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById('cartStep1').style.display = 'none';
    document.getElementById('cartStep2').style.display = 'block';
    
    // Smooth scroll to top of form
    const modalContent = document.querySelector('#cartModal .modal-content');
    if(modalContent) modalContent.scrollTop = 0;
    
    // Initialize Delivery Type UI
    setTimeout(() => {
        if(window.toggleDeliveryType) window.toggleDeliveryType(); 
    }, 100);
};

window.toggleDeliveryType = function(type) {
    const labelHome = document.getElementById('labelHomeDelivery');
    const labelPickup = document.getElementById('labelSelfPickup');
    
    // Check global storeSettings (from script.js)
    const canDeliver = typeof storeSettings !== 'undefined' ? storeSettings.isDeliveryEnabled : true;
    const canPickup = typeof storeSettings !== 'undefined' ? storeSettings.isPickupEnabled : true;

    // Show/Hide labels based on settings (UPDATED: Now blur/disable instead of hiding)
    if (labelHome) {
        if (canDeliver) {
            labelHome.style.opacity = '1';
            labelHome.style.filter = 'none';
            labelHome.style.pointerEvents = 'auto';
            labelHome.querySelector('input').disabled = false;
        } else {
            labelHome.style.opacity = '0.5';
            labelHome.style.filter = 'blur(1px)';
            labelHome.style.pointerEvents = 'none';
            labelHome.querySelector('input').disabled = true;
        }
    }
    if (labelPickup) {
        if (canPickup) {
            labelPickup.style.opacity = '1';
            labelPickup.style.filter = 'none';
            labelPickup.style.pointerEvents = 'auto';
            labelPickup.querySelector('input').disabled = false;
        } else {
            labelPickup.style.opacity = '0.5';
            labelPickup.style.filter = 'blur(1px)';
            labelPickup.style.pointerEvents = 'none';
            labelPickup.querySelector('input').disabled = true;
        }
    }

    if (!type) {
        if (canDeliver) type = "Home Delivery";
        else if (canPickup) type = "Self Pickup";
        else {
            // Both disabled - should handle this gracefully
            const checkoutForm = document.querySelector('.checkout-form');
            if (checkoutForm && !document.getElementById('storeClosedMsg')) {
                const msg = document.createElement('p');
                msg.id = 'storeClosedMsg';
                msg.style.color = 'red';
                msg.style.fontWeight = 'bold';
                msg.style.textAlign = 'center';
                msg.innerText = "Store is currently not accepting orders.";
                checkoutForm.prepend(msg);
                document.querySelector('.order-btn-main').disabled = true;
                document.querySelector('.order-btn-main').style.opacity = '0.5';
            }
            return;
        }
    }
    
    const radio = document.querySelector(`input[name="deliveryType"][value="${type}"]`);
    if(radio) radio.checked = true;

    const displaySection = document.getElementById('deliveryAddressSection');
    const deliveryChargeDisplay = document.getElementById('deliveryCharge');
    const totalWithDeliveryDisplay = document.getElementById('totalWithDelivery');
    
    // Base Total (from Cart)
    const cartTotal = parseFloat(document.getElementById('cartTotal')?.innerText || 0);
    
    if (type === 'Home Delivery' && canDeliver) {
        // UI Styles
        if(labelHome) { labelHome.style.background = "#f0f8ff"; labelHome.style.borderColor = "#6b0f1a"; }
        if(labelPickup) { labelPickup.style.background = "#fff"; labelPickup.style.borderColor = "#ddd"; }
        
        // Show Address Section
        if(displaySection) displaySection.style.display = 'block';
        
        const mappedCharge = window.currentDeliveryCharge || 0;
        
        if(deliveryChargeDisplay) {
            deliveryChargeDisplay.innerHTML = `₹${mappedCharge.toFixed(2)}`;
            deliveryChargeDisplay.style.color = "#6b0f1a";
        }
        
        if(totalWithDeliveryDisplay) totalWithDeliveryDisplay.innerHTML = `₹${(cartTotal + mappedCharge).toFixed(2)}`;
        
    } else if (type === 'Self Pickup' && canPickup) {
        // Self Pickup
        if(labelHome) { labelHome.style.background = "#fff"; labelHome.style.borderColor = "#ddd"; }
        if(labelPickup) { labelPickup.style.background = "#fff0f0"; labelPickup.style.borderColor = "#6b0f1a"; }
        
        // Hide Address Section
        if(displaySection) displaySection.style.display = 'none';
        
        // Zero Charges
        if(deliveryChargeDisplay) deliveryChargeDisplay.innerHTML = `<span style="color:green; font-weight:bold;">FREE (Pickup)</span>`;
        
        if(totalWithDeliveryDisplay) totalWithDeliveryDisplay.innerHTML = `₹${cartTotal.toFixed(2)}`;
    }
};

window.goToCheckoutStep1 = function() {
    document.getElementById('cartStep2').style.display = 'none';
    document.getElementById('cartStep1').style.display = 'block';
};