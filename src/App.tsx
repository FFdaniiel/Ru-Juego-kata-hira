import { FC } from 'react'
import { GameProvider } from './context/GameContext'
import { GameContainer } from './components/game/GameContainer'
import { Layout } from './components/layout/Layoud/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './assets/styles/toastify.css'

const App: FC = () => {
  return (
    <>
      <GameProvider>
        <Layout>
          <GameContainer />
        </Layout>
      </GameProvider>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
