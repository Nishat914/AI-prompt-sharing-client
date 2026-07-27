import { redirect } from 'next/navigation'

import { stripe } from '@/lib/stripe'
import { FaCheckCircle } from 'react-icons/fa'
import Link from 'next/link'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { subscription } from '@/lib/actions/payment'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  
  
 if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    const result = await subscription({ user, session_id });

    console.log(result);

    // console.log(session_id)
    return (
      <section id="success">
        <section className="min-h-[80vh] flex items-center justify-center px-4">
  <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border p-8 text-center">

    <div className="flex justify-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <FaCheckCircle className="text-5xl text-green-600" />
      </div>
    </div>

    <h1 className="text-3xl font-bold text-gray-800 mt-6">
      Payment Successful 🎉
    </h1>

    <p className="text-gray-600 mt-3">
      Thank you for your purchase. Your Premium subscription has been activated.
    </p>

    <div className="bg-gray-100 rounded-xl p-4 mt-6">
      <p className="text-sm text-gray-500">Confirmation email sent to</p>
      <p className="font-semibold break-all">{customerEmail}</p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      

      <Link href="/">
        <button className="w-full border text-white border-gray-300 bg-[#6F5B50] hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition">
          Back Home
        </button>
      </Link>
    </div>

  </div>
</section>
      </section>
    )
  }
}