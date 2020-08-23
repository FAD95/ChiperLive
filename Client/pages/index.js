import Head from '../src/components/head'
import LiveStreamsList from '../src/components/LiveStreamsList'

const Index = () => (
  <>
    <Head title='Chiper Live' />
    <div className='container'>
      <LiveStreamsList />
    </div>
    <style jsx>{`
      .container{
        padding: 10px 20px;
      }
    `}
    </style>
  </>
)

export default Index
