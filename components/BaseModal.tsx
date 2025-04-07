import { FC, ReactNode } from 'react';
import { Modal, ModalProps, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

type BaseModalProps = ModalProps & {
  children: ReactNode;
};

export const BaseModal: FC<BaseModalProps> = ({ children, ...rest }) => {

  const { colors } = useTheme();

  return (
    <Modal animationType="slide" transparent={true} {...rest}>
      <Pressable style={styles.modalContainer} onPress={rest.onRequestClose}>
        <Pressable style={[styles.modalBox, {backgroundColor: colors.card}]} onPress={() => { }}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    gap: 32,
  },
});
