import { StyleSheet } from 'react-native';

export const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004D40',
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
    marginTop: 5,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
    borderWidth: 1, 
    borderColor: '#FF6F00', 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00', 
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E3E3E3',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: 'bold',
  },
  navTextActive: {
    fontSize: 14,
    color: '#FF6F00', 
    fontWeight: 'bold',
  },
});
