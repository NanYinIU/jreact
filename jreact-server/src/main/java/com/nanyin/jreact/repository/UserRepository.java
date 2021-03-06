package com.nanyin.jreact.repository;

import com.nanyin.jreact.entry.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

      User findUserByUsername(String name);

//      @Override
//      @PreAuthorize("@UserRepository.findById(#id).username == authentication?.name")
//      void deleteById(@Param("id") Long id);

      @Query(value = "SELECT GROUP_concat(DISTINCT r.name ) from r_user_role ru  left join role r on r.id=ru.role_id" +
              " left join user u on u.id=ru.user_id where u.username=:username",nativeQuery = true)
      String findRoleString(String username);
}


