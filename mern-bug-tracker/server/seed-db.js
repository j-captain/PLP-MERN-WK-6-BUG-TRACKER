const mongoose = require('mongoose');
const Bug = require('./models/Bug');

// Kenyan tech-oriented bug data
const bugTitles = [
  'M-Pesa API timeout',
  'Safaricom USSD menu freezing',
  'iHub login redirect loop',
  'Kenyatta University portal crash',
  'Jumia checkout button unresponsive',
  'Twiga Foods inventory sync failure',
  'Tala app KYC verification stuck',
  'Bonga Points calculation error',
  'KCB mobile app transaction history blank',
  'E-citizen payment gateway down',
  'Maisha Namba registration form submit fails',
  'Nairobi County parking system offline',
  'Uber East Africa surge pricing bug',
  'Zuku TV app buffering on Android',
  'Farmers Choice e-commerce cart reset',
  'Naivas loyalty points not updating',
  'Equitel money transfer delay',
  'Lipa Na M-Pesa QR code scanner crash',
  'MyDawa prescription upload failing',
  'Brighter Monday job search timeout',
  'Sendy delivery tracking not updating',
  'Poa Internet captive portal loop',
  'KPLC token purchase confirmation missing',
  'NTSA TIMS system vehicle search error',
  'SokoWatch farmer payment discrepancy',
  'Sky.Garden product image upload fails',
  'Apollo agriculture weather data mismatch',
  'Kwara digital banking app crash on login',
  'Shamba Pride agro-inputs catalog blank',
  'Eneza Education quiz submission error'
];

const bugDescriptions = [
  'M-Pesa API times out after 30 seconds during high traffic periods',
  'USSD menu freezes at option 4 when checking airtime balance',
  'iHub login redirects continuously between auth pages',
  'Student portal crashes when accessing exam results',
  'Checkout button does nothing when clicked on Jumia mobile app',
  'Twiga inventory not syncing with vendor systems overnight',
  'Tala app stuck at 99% during KYC verification process',
  'Bonga points showing incorrect balance after redemption',
  'Transaction history shows blank screen for last 3 months',
  'E-citizen payments failing with "gateway unavailable" error',
  'Maisha Namba form submission fails silently with no error',
  'Nairobi parking payment system offline since midnight',
  'Uber showing incorrect surge pricing in Nairobi CBD',
  'Zuku TV app buffers continuously on Android 10+ devices',
  'Shopping cart empties automatically after adding 5 items',
  'Naivas loyalty points not reflecting after supermarket purchases',
  'Equitel transfers taking over 2 hours to complete',
  'QR code scanner crashes app when scanning Lipa Na M-Pesa codes',
  'Prescription upload fails with "file type not supported" error',
  'Job search times out when filtering by "Nairobi" location',
  'Sendy tracking shows "in transit" even after delivery',
  'Poa Internet captive portal redirects endlessly after login',
  'KPLC tokens purchase completes but no confirmation SMS received',
  'TIMS system returns "vehicle not found" for valid number plates',
  'SokoWatch farmers receiving 10% less than invoiced amount',
  'Sky.Garden rejects product images over 1MB without error message',
  'Apollo agriculture showing incorrect rainfall predictions',
  'Kwara app crashes immediately after entering PIN on login',
  'Shamba Pride catalog shows blank screen on mobile devices',
  'Eneza quiz submissions fail with network error on Safaricom'
];

const kenyanReporters = [
  'Wanjiku Mwangi',
  'Kamau Kinyanjui',
  'Auma Odhiambo',
  'Njeri Wambui',
  'Omondi Otieno',
  'Atieno Adhiambo',
  'Maina Kariuki',
  'Nyambura Gitau',
  'Ochieng Okoth',
  'Wairimu Nderitu',
  'Mutiso Muli',
  'Akinyi Owino',
  'Kipchoge Tanui',
  'Wambua Musyoki',
  'Chebet Langat',
  'Onyango Awiti',
  'Muthoni Kamau',
  'Simiyu Barasa',
  'Were Onyango',
  'Njoki Mwangi',
  'Korir Rono',
  'Adhiambo Opiyo',
  'Kibet Cheruiyot',
  'Wanjiru Mbugua',
  'Oloo Adera',
  'Mumbi Ngugi',
  'Kiptoo Sang',
  'Anyango Owuor',
  'Mutua Mwenda',
  'Waceke Githinji'
];

console.log();
console.log('🌱 \x1b[36mStarting Kenyan Tech Bug Database Seeding...\x1b[0m');

// MongoDB connection with error handling
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bugTracker', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log();
    console.log('🟢 \x1b[32mConnected to MongoDB\x1b[0m');
  } catch (err) {
    console.error('🔴 \x1b[31mMongoDB connection error:\x1b[0m', err.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Bug.deleteMany({});
    console.log('🧹 \x1b[33mCleared existing bugs\x1b[0m');

    // Create bugs
    const bugs = [];
    const statuses = ['open', 'in-progress', 'resolved'];
    const priorities = ['low', 'medium', 'high', 'critical'];
    
    console.log('\n🐛 \x1b[36mCreating 30 Kenyan Tech Bugs...\x1b[0m');
    console.log();
    
    for (let i = 0; i < 30; i++) {
      try {
        // Random status and priority (weighted towards open/medium)
        const status = i % 5 === 0 ? statuses[2] : 
                      i % 3 === 0 ? statuses[1] : statuses[0];
        const priority = i % 10 === 0 ? priorities[3] : 
                        i % 5 === 0 ? priorities[2] : 
                        i % 3 === 0 ? priorities[0] : priorities[1];
        
        const bug = new Bug({
          title: bugTitles[i],
          description: bugDescriptions[i],
          status,
          priority,
          reporter: kenyanReporters[i]
        });
        
        await bug.save();
        bugs.push(bug);
        console.log(`➕ \x1b[32mCreated bug [${i+1}]:\x1b[0m ${bugTitles[i].substring(0, 30)}... \x1b[33m(${status}/${priority})\x1b[0m - \x1b[36m${kenyanReporters[i]}\x1b[0m`);
        
        // Add small delay between creations
        if (i < 29) await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`⚠️ \x1b[31mError creating bug ${i+1}:\x1b[0m`, error.message);
      }
    }

    // Calculate statistics
    const totalBugs = bugs.length;
    const openBugs = bugs.filter(b => b.status === 'open').length;
    const inProgressBugs = bugs.filter(b => b.status === 'in-progress').length;
    const resolvedBugs = bugs.filter(b => b.status === 'resolved').length;
    const lowPriority = bugs.filter(b => b.priority === 'low').length;
    const mediumPriority = bugs.filter(b => b.priority === 'medium').length;
    const highPriority = bugs.filter(b => b.priority === 'high').length;
    const criticalPriority = bugs.filter(b => b.priority === 'critical').length;

    // Beautiful summary table
    console.log('\n\x1b[42m\x1b[30m✅ BUG SEEDING SUMMARY\x1b[0m');
    console.log('\x1b[32m┌──────────────────────────────────────┬───────────┐\x1b[0m');
    console.log(`\x1b[32m│\x1b[0m \x1b[1m\x1b[36mTotal Bugs Created\x1b[0m              \x1b[32m│\x1b[0m ${totalBugs.toString().padStart(2)}      \x1b[32m│\x1b[0m`);
    console.log('\x1b[32m├──────────────────────────────────────┼───────────┤\x1b[0m');
    console.log('\x1b[32m│\x1b[0m \x1b[1m\x1b[36mStatus Distribution\x1b[0m             \x1b[32m│           \x1b[0m\x1b[32m│\x1b[0m');
    console.log(`\x1b[32m│\x1b[0m 🟢 Open                         \x1b[32m│\x1b[0m ${openBugs.toString().padStart(2)} (${Math.round(openBugs/totalBugs*100)}%) \x1b[32m│\x1b[0m`);
    console.log(`\x1b[32m│\x1b[0m 🟡 In-progress                  \x1b[32m│\x1b[0m ${inProgressBugs.toString().padStart(2)} (${Math.round(inProgressBugs/totalBugs*100)}%) \x1b[32m│\x1b[0m`);
    console.log(`\x1b[32m│\x1b[0m 🔴 Resolved                     \x1b[32m│\x1b[0m ${resolvedBugs.toString().padStart(2)} (${Math.round(resolvedBugs/totalBugs*100)}%) \x1b[32m│\x1b[0m`);
    console.log('\x1b[32m├──────────────────────────────────────┼───────────┤\x1b[0m');
    console.log('\x1b[32m│\x1b[0m \x1b[1m\x1b[36mPriority Distribution\x1b[0m            \x1b[32m│           \x1b[0m\x1b[32m│\x1b[0m');
    console.log(`\x1b[32m│\x1b[0m 🔵 Low                          \x1b[32m│\x1b[0m ${lowPriority.toString().padStart(2)} (${Math.round(lowPriority/totalBugs*100)}%) \x1b[32m│\x1b[0m`);
    console.log(`\x1b[32m│\x1b[0m 🟠 Medium                       \x1b[32m│\x1b[0m ${mediumPriority.toString().padStart(2)} (${Math.round(mediumPriority/totalBugs*100)}%) \x1b[32m│\x1b[0m`);
    console.log(`\x1b[32m│\x1b[0m 🔴 High                        \x1b[32m│\x1b[0m ${highPriority.toString().padStart(2)} (${Math.round(highPriority/totalBugs*100)}%) \x1b[32m│\x1b[0m`);
    console.log(`\x1b[32m│\x1b[0m ⚠️ Critical                   \x1b[32m│\x1b[0m ${criticalPriority.toString().padStart(2)} (${Math.round(criticalPriority/totalBugs*100)}%) \x1b[32m│\x1b[0m`);
    console.log('\x1b[32m└──────────────────────────────────────┴───────────┘\x1b[0m');
    console.log('\n\x1b[32m✨ \x1b[1mSeeding completed successfully!\x1b[0m \x1b[32m✨\x1b[0m');
    console.log();

  } catch (error) {
    console.error('\n❌ \x1b[31mSeeding failed:\x1b[0m', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 \x1b[33mDisconnected from MongoDB\x1b[0m');
    process.exit(0);
  }
};

seedDatabase();