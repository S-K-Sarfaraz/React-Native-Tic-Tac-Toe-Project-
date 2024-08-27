import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Snackbar from 'react-native-snackbar'
import Icons from './components/Icons'
import { Pressable } from 'react-native'

export default function App() {
  const [isCross, setIsCross] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner = () => {
    // Checking Winner of the Game
    if(
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2]
    ) {
      setGameWinner(`${gameState[0]} Won the Game! 🥳 `)
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[3] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} Won the Game! 🥳 `)
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[6] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} Won the Game! 🥳 `)
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[0] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} Won the Game! 🥳 `)
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[1] === gameState[57]
    ) {
      setGameWinner(`${gameState[1]} Won the Game! 🥳 `)
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[2] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} Won the Game! 🥳 `)
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[0] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} Won the Game! 🥳 `)
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[2] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} Won the Game! 🥳 `)
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if(gameWinner){
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#d1b008',
        textColor: 'white'
      })
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: 'Provide place is alredy filled',
        backgroundColor: '#e31e1e',
        textColor: 'white'
      })
    }

    checkIsWinner()
  }

  return (
    <SafeAreaView>

      {/* Top Portion of the Game */}
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
        style={[
          styles.playerInfo,
          isCross ? styles.playerX : styles.playerO
        ]}
        >
          <Text style={styles.gameTurnTxt}>
            player {isCross ? 'X' : 'O'}'s Turn'
          </Text>
        </View>
      )}

      {/* Game Grid */}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}
          >
            <Icons name={item}/>
          </Pressable>
        )}
      />

      {/* <View style={styles.gameBtn}>
        <Text style={styles.gameBtnText} onPress={() => reloadGame()}>Reload The Game!!</Text>
      </View> */}

      {/* Action Button */}
      <Pressable
        style={styles.gameBtn}
        onPress={() => reloadGame()}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start the New Game!!' : 'Reload the GAme!!'}
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
})