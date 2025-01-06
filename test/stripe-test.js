require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function testStripeSetup() {
  try {
    console.log('Testing Stripe configuration...');

    // Verify API keys
    console.log('Checking API connection...');
    const balance = await stripe.balance.retrieve();
    console.log('✅ API connection successful');

    // List products and prices
    console.log('\nFetching products and prices...');
    const prices = await stripe.prices.list({
      limit: 5,
      expand: ['data.product']
    });
    
    console.log('\nAvailable prices:');
    prices.data.forEach(price => {
      console.log(`- ${price.product.name}: ${(price.unit_amount / 100).toFixed(2)} ${price.currency} (ID: ${price.id})`);
    });

    console.log('\n✅ Stripe setup verified successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testStripeSetup();